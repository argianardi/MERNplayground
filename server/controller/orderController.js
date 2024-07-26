import asyncHandler from '../middlewares/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const CreateOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItems } = req?.body;

  if (!cartItems || cartItems.length < 1) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  let orderItems = [];
  let totalPrice = 0;

  for (const cart of cartItems) {
    const productData = await Product.findOne({ _id: cart?.product });

    if (!productData) {
      res.status(404);
      throw new Error('Product not found');
    }

    const { name, price, _id } = productData;
    const singleProduct = {
      quantity: cart?.quantity,
      name,
      price,
      product: _id,
    };

    orderItems = [...orderItems, singleProduct];
    totalPrice += cart?.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItems,
    totalPrice,
    firstName,
    lastName,
    phone,
    email,
    user: req?.user?.id,
  });

  return res.status(201).json({
    code: '201',
    status: 'Success',
    message: 'Order created successfully',
    // data: { totalPrice: total, orderItems: orderItems },
    data: order,
  });
});

export const GetAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  return res.status(200).json({
    code: '200',
    message: 'Request was successful',
    data: orders,
  });
});

export const GetOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req?.params?.id);

  return res?.status(200).json({
    code: '200',
    message: 'Request was successful id',
    data: order,
  });
});

export const CurrentUserOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req?.user?.id });

  return res.status(200).json({
    code: '200',
    message: 'Request was successful',
    data: order,
  });
});
