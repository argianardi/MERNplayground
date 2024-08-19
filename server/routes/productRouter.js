import express from 'express';
import {
  CloudinaryUploadImage,
  CreateProduct,
  DeleteProduct,
  GetAllProduct,
  GetProductById,
  LocalUploadImage,
  UpdateProduct,
} from '../controller/productController.js';
import {
  ownerMiddleware,
  protectedMiddleware,
} from '../middlewares/authMidleware.js';
import { upload as uploadCloudinary } from '../utils/cloudinaryUploadFileHandler.js';
import { upload as uploadLocal } from '../utils/localUploadFileHandler.js';
import { protectedWithoutCookieMiddleware } from '../middlewares/authWithoutCookieMidleware.js';
const router = express.Router();

router.post('/', uploadCloudinary.single('image'), CreateProduct);
// get all products with protected use cookie middleware
router.get('/', protectedMiddleware, GetAllProduct);
// get all products with protected use cookie middleware
router.get('/without-cookie', protectedWithoutCookieMiddleware, GetAllProduct);
router.get('/:id', GetProductById);
// router.get('/:id', protectedMiddleware, GetProductById);
router.put(
  '/:id',
  protectedMiddleware,
  ownerMiddleware,
  uploadCloudinary.single('image'),
  UpdateProduct
);
router.delete('/:id', protectedMiddleware, ownerMiddleware, DeleteProduct);
router.post(
  '/file-upload-local',
  protectedMiddleware,
  ownerMiddleware,
  uploadLocal.single('image'),
  LocalUploadImage
);

router.post(
  '/file-upload-cloudinary',
  protectedMiddleware,
  ownerMiddleware,
  uploadCloudinary.single('image'),
  CloudinaryUploadImage
);

export default router;
