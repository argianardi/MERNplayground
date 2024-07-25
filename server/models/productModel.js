import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name is already taken'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Sepatu', 'Kemeja', 'Baju', 'Celana'],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
