import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || '';

export const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';