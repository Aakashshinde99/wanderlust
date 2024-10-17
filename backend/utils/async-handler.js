import express from 'express'; // Import the express module
const { Request, Response, NextFunction } = express; // Destructure types

export const asyncHandler = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};
