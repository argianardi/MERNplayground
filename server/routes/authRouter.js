import express from 'express';
import {
  getCurrentUser,
  loginUser,
  loginUserWithoutCookie,
  logoutUser,
  registerUser,
  registerUserWithoutCookie,
} from '../controller/authController.js';
import { protectedMiddleware } from '../middlewares/authMidleware.js';

const router = express.Router();

// register with cookie
router.post('/register', registerUser);
// register without cookie
router.post('/register-without-cookie', registerUserWithoutCookie);

// register with cookie
router.post('/login', loginUser);
// register without cookie
router.post('/login-without-cookie', loginUserWithoutCookie);

router.post('/logout', protectedMiddleware, logoutUser);

router.get('/getuser', protectedMiddleware, getCurrentUser);

export default router;
