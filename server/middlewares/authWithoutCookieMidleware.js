import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';

export const protectedWithoutCookieMiddleware = asyncHandler(
  async (req, res, next) => {
    let token;
    token = req?.headers?.authorization;

    // Check if the token is provided in the header
    if (
      req?.headers?.authorization &&
      req?.headers?.authorization?.startsWith('Bearer')
    ) {
      try {
        // Get token from the header
        token = req?.headers?.authorization?.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Move to the next middleware or controller
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);
