import { NextFunction, Request, Response } from "express";
import { loginSchema, SignInDTO, SignInResponseDTO, SignUpDTO, SignUpResponseDTO, signupSchema } from "../dtos/user.dto";
import { signIn, signUp } from "../services/userService";

//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const signInAction = async (req: Request<undefined, SignInResponseDTO, SignInDTO, undefined>, res: Response, next: NextFunction) => {
    try {
        const loginData = loginSchema.parse(req.body);
        const result = await signIn(loginData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


export const signUpAction = async (req: Request<undefined, SignUpResponseDTO, SignUpDTO, undefined>, res: Response, next: NextFunction) => {
    try {
        const signUpData = signupSchema.parse(req.body);
        const result = await signUp(signUpData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


