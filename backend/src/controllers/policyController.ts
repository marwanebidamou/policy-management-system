import { NextFunction, Request, Response } from "express";
import { commentPolicySchema, CreatePolicyDTO, createPolicySchema, PolicyDTO, PostCommentPolicy, PostCommentResponseDTO, SearchPolicyDTO, SearchPolicyResultDTO, UpVotePolicyResponseDTO } from "../dtos/policy.dto";
import { commentPolicy, createPolicy, getAllPolicies, UpVotePolicy } from '../services/policyService';


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


// Upvote a policy
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const upVotePolicyAction = async (req: Request<{ id: string }, UpVotePolicyResponseDTO, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['userId'] as string;
        const result = await UpVotePolicy(req.params.id, userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


// Add comment to a policy
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const commentPolicyAction = async (req: Request<{ id: string }, PostCommentResponseDTO, PostCommentPolicy, {}>, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['userId'] as string;
        const comment = commentPolicySchema.parse(req.body);

        const result = await commentPolicy(req.params.id, userId, comment.content);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};