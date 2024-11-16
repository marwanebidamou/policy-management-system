import { NextFunction, Request, Response } from "express";
import { loginSchema, SignInDTO, SignInResponseDTO } from "../dtos/user.dto";

import bcrypt from 'bcrypt';

//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const signInAction = async (req: Request<undefined, SignInDTO, SignInResponseDTO, undefined>, res: Response, next: NextFunction) => {
    try {
        const loginData = loginSchema.parse(req.body);

        const hash = await bcrypt.hash(loginData.password, 10);

        const comparaison = await bcrypt.compare(loginData.password, hash);
        res.status(200).json({ hash, pass: loginData.password, comparaison });
    } catch (error) {
        next(error);
    }
};