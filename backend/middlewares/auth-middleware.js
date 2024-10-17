import { JWT_SECRET } from '../config/utils.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { Request, Response, NextFunction } from 'express';

// Removed TypeScript interface declaration and ObjectId import
// For a MongoDB ObjectId, you can work with it as a string if needed

export const authMiddleware = async (req, res, next) => { // Removed TypeScript types
  const token = req.cookies.access_token; // Removed the 'await' here as req.cookies.access_token is not a promise
  if (!token) {
    return next(
      new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USERS.RE_LOGIN,
      })
    );
  }

  try {
    // Removed Type Assertion 'as JwtPayload' 
    const decodedToken = jwt.verify(token, JWT_SECRET); 
    const _id = decodedToken._id; // _id can be treated as a string if needed
    req.user = await User.findById(_id);
    next();
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

export const isAdminMiddleware = async (req, res, next) => { // Removed TypeScript types
  const role = req.user.role;
  if (role !== 'Admin') { // Use 'Admin' as a string instead of Role.Admin
    return next(
      new ApiError({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER,
      })
    );
  }
  next();
};
