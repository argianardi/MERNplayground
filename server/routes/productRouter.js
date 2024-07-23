import express from 'express';
import {
  CreateProduct,
  GetAllProduct,
  GetProductById,
} from '../controller/productController.js';

const router = express.Router();

router.post('/', CreateProduct);
router.get('/', GetAllProduct);
router.get('/:id', GetProductById);

export default router;
