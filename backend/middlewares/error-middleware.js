import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import { Request, Response, NextFunction } from 'express'; // This import is TypeScript-specific and will cause an error in JS

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });
  // Removed the next() call to prevent attempting to send another response
};

export default errorMiddleware;
