import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtUtil";
import { JwtPayload } from "jsonwebtoken";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    console.log("Hello from authenticate middleware");

    const token = req.headers.authorization?.split(' ')[1]; // supposed the header is: Bearer xxxxx
    if (!token) {
        res.status(401).json({ error: 'Unauthorized. Token not provided.' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        console.log("DECODED TOKEN", decoded);
        req.headers['userId'] = (decoded as JwtPayload)['id']; // we gonna use it in user specific routes (like my policies,etc...)
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }

}
