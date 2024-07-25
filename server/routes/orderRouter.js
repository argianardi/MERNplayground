import express from 'express';
import { protectedMiddleware } from '../middlewares/authMidleware.js';
import { CreateOrder } from '../controller/orderController.js';

const router = express.Router();

router.post('/', protectedMiddleware, CreateOrder);

export default router;
