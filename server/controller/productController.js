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
