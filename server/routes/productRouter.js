import express from 'express';
import {
  CreateProduct,
  GetAllProduct,
  GetProductById,
  UpdateProduct,
} from '../controller/productController.js';

const router = express.Router();

router.post('/', CreateProduct);
router.get('/', GetAllProduct);
router.get('/:id', GetProductById);
router.put('/:id', UpdateProduct);

export default router;
