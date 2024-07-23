import express from 'express';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controller/authController.js';
import { protectedMiddleware } from '../middlewares/authMidleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', protectedMiddleware, logoutUser);

router.get('/getuser', protectedMiddleware, getCurrentUser);

export default router;
