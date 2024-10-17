import { JWT_SECRET } from '../config/utils.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role-type.js';
import User from '../models/user.js';

import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';

interface JwtPayload {
  _id: ObjectId;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
    const { _id } = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req.user = await User.findById(_id);
    next();
  } catch (error: any) {
    console.error('Token verification error:', error);
    return next(
      new ApiError({
        status: HTTP_STATUS.FORBIDDEN,
        message: RESPONSE_MESSAGES.USERS.INVALID_TOKEN,
      })
    );
  }
};

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const role = req.user.role;
  if (role !== Role.Admin) {
    return next( // Use 'next()' to pass the error to the next middleware
      new ApiError({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER,
      })
    );
  }
  next();
};
