import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.send('register');
});

router.post('/login', (req, res) => {
  res.send('Login');
});

router.get('/logout', (req, res) => {
  res.send('Logout');
});

router.get('/getuser', (req, res) => {
  res.send('Get User');
});

export default router;
