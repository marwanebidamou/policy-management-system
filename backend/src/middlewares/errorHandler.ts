import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";



export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("ERROR TYPE", typeof (err));
    if (err instanceof ZodError) {
        // Handle Zod validation errors
        res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: err.errors.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
        return;
    }

    if (err instanceof BaseError) {
        // Handle our internal errors
        res.status(err.type).json({
            success: false,
            error: err.message,
            ...(err.details && { details: err.details }),
        });
        return;
    }

    // Handle unexpected errors
    console.error(err);
    res.status(500).json({
        error: 'Internal Server Error',
    });
};




export default errorHandler;

