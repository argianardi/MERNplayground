import express from 'express';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  registerUserJson,
} from '../controller/authController.js';
import { protectedMiddleware } from '../middlewares/authMidleware.js';

const router = express.Router();

// register with cookie
router.post('/register', registerUser);
// register without cookie
router.post('/registerjson', registerUserJson);

router.post('/login', loginUser);

router.post('/logout', protectedMiddleware, logoutUser);

router.get('/getuser', protectedMiddleware, getCurrentUser);

export default router;
