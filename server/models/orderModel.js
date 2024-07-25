import mongoose, { Schema } from 'mongoose';

const singleProduct = Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const orderSchema = new Schema({
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
  },
  itemsDetail: [singleProduct],
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'failed', 'success', 'canceled'],
    default: 'pending',
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
