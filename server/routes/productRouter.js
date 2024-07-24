import express from 'express';
import {
  CreateProduct,
  DeleteProduct,
  GetAllProduct,
  GetProductById,
  UpdateProduct,
  UploadImage,
} from '../controller/productController.js';
import {
  ownerMiddleware,
  protectedMiddleware,
} from '../middlewares/authMidleware.js';
import { upload } from '../utils/uploadFileHandler.js';

const router = express.Router();

router.post('/', ownerMiddleware, CreateProduct);
router.get('/', protectedMiddleware, GetAllProduct);
router.get('/:id', protectedMiddleware, GetProductById);
router.put('/:id', protectedMiddleware, ownerMiddleware, UpdateProduct);
router.delete('/:id', protectedMiddleware, ownerMiddleware, DeleteProduct);
router.post(
  '/file-upload',
  protectedMiddleware,
  ownerMiddleware,
  upload.single('image'),
  UploadImage
);

export default router;
