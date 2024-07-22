import express from 'express';
import { loginUser, registerUser } from '../controller/authController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', (req, res) => {
  res.send('Logout');
});

router.get('/getuser', (req, res) => {
  res.send('Get User');
});

export default router;
