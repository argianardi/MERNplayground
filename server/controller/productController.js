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
