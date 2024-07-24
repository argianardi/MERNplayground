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
  const products = await Product.find();

  return res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Request was successful',
    data: products,
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
