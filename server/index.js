import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

import authRouter from './routes/authRouter.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Route
app.use('/api/v1/auth', authRouter);

// Error handling middleware
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
