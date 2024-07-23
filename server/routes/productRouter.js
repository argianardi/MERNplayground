import express from 'express';
import {
  CreateProduct,
  DeleteProduct,
  GetAllProduct,
  GetProductById,
  UpdateProduct,
} from '../controller/productController.js';
import { protectedMiddleware } from '../middlewares/authMidleware.js';

const router = express.Router();

router.post('/', CreateProduct);
router.get('/', protectedMiddleware, GetAllProduct);
router.get('/:id', protectedMiddleware, GetProductById);
router.put('/:id', protectedMiddleware, UpdateProduct);
router.delete('/:id', protectedMiddleware, DeleteProduct);

export default router;
