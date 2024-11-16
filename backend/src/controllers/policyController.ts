import { NextFunction, Request, Response } from "express";
import { CreatePolicyDTO, createPolicySchema, PolicyDTO, SearchPolicyDTO, SearchPolicyResultDTO } from "../dtos/policy.dto";
import { createPolicy, getAllPolicies } from '../services/policyService';


// Create a new tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const createPolicyAction = async (req: Request<{}, PolicyDTO, CreatePolicyDTO, {}>, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['userId'] as string;
        const validatedData = createPolicySchema.parse(req.body);
        const newPolicy = await createPolicy(userId, validatedData);
        res.status(201).json(newPolicy);
    } catch (error) {
        next(error);
    }
};


// Create a new policy
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const getPoliciesAction = async (req: Request<{}, SearchPolicyResultDTO, {}, SearchPolicyDTO>, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['userId'] as string;
        const result = await getAllPolicies(userId, req.query);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};