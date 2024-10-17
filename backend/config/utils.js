import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;  // Default to port 3000 if not defined
const MONGODB_URI = process.env.MONGODB_URI || '';
const REDIS_URL = process.env.REDIS_URL || '';
const ACCESS_COOKIE_MAXAGE = process.env.ACCESS_COOKIE_MAXAGE || '3600000'; // Default to 1 hour
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '1h';
const REFRESH_COOKIE_MAXAGE = process.env.REFRESH_COOKIE_MAXAGE || '604800000'; // Default to 7 days
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to set a secure default
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

export {
  MONGODB_URI,
  PORT,
  REDIS_URL,
  ACCESS_COOKIE_MAXAGE,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_COOKIE_MAXAGE,
  REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  FRONTEND_URL,
  NODE_ENV,
};
