import mongoose from 'mongoose';
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/products.js';

export const CreateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    code: '201',
    status: 'Scuccess',
    message: 'Product created successfully',
    data: newProduct,
  });
});

export const GetAllProduct = asyncHandler(async (req, res) => {
  //   Req query
  const queryObj = { ...req?.query };

  const excludedFields = ['page', 'limit'];
  excludedFields.forEach((element) => delete queryObj[element]);

  let query = Product.find(queryObj);

  const totalItems = await Product.countDocuments(queryObj);

  // Pagination
  const page = req?.query?.page * 1 || 1;
  const limitData = req?.query?.limit * 1 || 30;
  const skipData = (page - 1) * limitData;
  const totalPages = Math.ceil(totalItems / limitData);

  query = query.skip(skipData).limit(limitData);

  if (req?.query?.page) {
    const numProduct = await Product.countDocuments();
    if (skipData >= numProduct) {
      res.status(404);
      throw new Error('This page does not exist');
    }
  }

  const products = await query;

  return res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Request was successful',
    data: products,
    page: {
      totalItems: totalItems,
      pageSize: limitData,
      totalPages: totalPages,
      currentPage: page,
    },
  });
});

export const GetProductById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  const product = await Product.findById(req?.params?.id);

  if (!product) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Request was successful',
    data: product,
  });
});

export const UpdateProduct = asyncHandler(async (req, res) => {
  //   Check Id format
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  // check if product is exist
  const updateProduct = await Product.findByIdAndUpdate(
    req?.params?.id,
    req?.body,
    { runValidators: true, new: true }
  );

  // check if product is not exist
  if (!updateProduct) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(201).json({
    code: '201',
    status: 'Success',
    message: 'Product updated successfully',
    data: updateProduct,
  });
});

export const DeleteProduct = asyncHandler(async (req, res) => {
  //   Check Id format
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  const deletedProduct = await Product.findByIdAndDelete(req?.params?.id);

  // Check if product is not exist
  if (!deletedProduct) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(201).json({
    code: '200',
    status: 'Success',
    message: 'Product deleted successfully',
    data: deletedProduct,
  });
});

export const UploadImage = asyncHandler(async (req, res) => {
  const image = req?.file;

  if (!image) {
    res.status(400);
    throw new Error('Please add an image');
  }

  const imageFileName = image.filename;
  const pathImageFile = `/uploads/${imageFileName}`;

  res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Image uploaded successfully',
    data: pathImageFile,
  });
});
