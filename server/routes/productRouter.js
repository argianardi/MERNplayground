import express from 'express';
import { CreateProduct } from '../controller/productController.js';

const router = express.Router();

router.post('/', CreateProduct);

export default router;
