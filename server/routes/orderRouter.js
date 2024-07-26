import express from 'express';
import {
  ownerMiddleware,
  protectedMiddleware,
} from '../middlewares/authMidleware.js';
import {
  CreateOrder,
  CurrentUserOrder,
  GetAllOrders,
  GetOrderById,
} from '../controller/orderController.js';

const router = express.Router();

router.post('/', protectedMiddleware, CreateOrder);
router.get('/', protectedMiddleware, ownerMiddleware, GetAllOrders);
router.get('/:id', protectedMiddleware, ownerMiddleware, GetOrderById);
router.get('/current/user', protectedMiddleware, CurrentUserOrder);

export default router;
