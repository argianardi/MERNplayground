import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import authRouter from './routes/authRouter.js';
import productRouter from './routes/productRouter.js';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./public'));

// Route
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect DB
connectDB();

// Port
const PORT = process.env.PORT || 3010;

// Server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
