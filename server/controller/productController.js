import mongoose from 'mongoose';
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { generateFileName } from '../utils/generateFileName.js';

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

  const excludedFields = ['page', 'limit', 'name'];
  excludedFields.forEach((element) => delete queryObj[element]);

  let query;

  if (req?.query?.name) {
    query = Product.find({
      name: { $regex: req?.query?.name, $options: 'i' },
    });
  } else {
    query = Product.find(queryObj);
  }

  const totalItems = await Product.countDocuments(query);

  // Pagination
  const page = req?.query?.page * 1 || 1;
  const limitData = req?.query?.limit * 1 || 30;
  const skipData = (page - 1) * limitData;
  const totalPages = Math.ceil(totalItems / limitData);

  query = query.skip(skipData).limit(limitData);

  if (req?.query?.page) {
    if (skipData >= totalItems) {
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

export const LocalUploadImage = asyncHandler(async (req, res) => {
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

export const CloudinaryUploadImage = asyncHandler(async (req, res) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: 'uploads',
      allowed_formats: ['jpg', 'svg', 'png'],
      public_id: generateFileName(req?.file?.originalname),
    },
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          code: '500',
          status: 'Error',
          message: error?.message,
        });
      }

      res.status(200).json({
        code: '200',
        status: 'Success',
        message: 'Image uploaded successfully',
        data: result?.secure_url,
      });
    }
  );

  streamifier.createReadStream(req?.file?.buffer).pipe(stream);
});
