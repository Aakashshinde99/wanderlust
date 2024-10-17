import { JWT_SECRET } from '../config/utils.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import express from 'express'; // Default import of express

// Destructure the types from the imported express module
const { Request, Response, NextFunction } = express;

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token; // Access the token from cookies
  if (!token) {
    return next(
      new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
      })
    );
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const _id = decodedToken._id; // Extract user ID from decoded token
    req.user = await User.findById(_id); // Find user by ID and attach to request object
    next(); // Call the next middleware
  } catch (error) {
    console.error('Token verification error:', error);
    return next(
      new ApiError({
        status: HTTP_STATUS.FORBIDDEN,
        message: RESPONSE_MESSAGES.USERS.INVALID_TOKEN,
      })
    );
  }
};

export const isAdminMiddleware = async (req, res, next) => {
  const role = req.user.role; // Get the user role from the request object
  if (role !== 'Admin') { // Check if the user role is 'Admin'
    return next(
      new ApiError({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER,
      })
    );
  }
  next(); // Call the next middleware
};
