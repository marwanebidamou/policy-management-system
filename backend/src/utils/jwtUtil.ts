import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/env';


// Generate a JWT token
export const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Verify a JWT token
export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};