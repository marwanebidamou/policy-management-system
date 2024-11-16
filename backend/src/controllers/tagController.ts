import { NextFunction, Request, Response } from "express";
import { CreateTagDTO, createTagSchema, TagDTO, UpdateTagDTO, updateTagSchema } from "../dtos/tag.dto";
import { createTag, updateTag, deleteTag, getAllTags, getTagById } from '../services/tagService';


// Create a new tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const createTagAction = async (req: Request<{}, TagDTO, CreateTagDTO, {}>, res: Response, next: NextFunction) => {
    try {
        const validatedData = createTagSchema.parse(req.body);
        const savedTag = await createTag(validatedData);
        res.status(201).json(savedTag);
    } catch (error) {
        next(error);
    }
};

// Edit a tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const editTagAction = async (req: Request<{ id: string }, TagDTO, UpdateTagDTO, {}>, res: Response, next: NextFunction) => {
    try {
        const validatedData = updateTagSchema.parse(req.body);
        const savedTag = await updateTag(req.params.id, validatedData);
        res.status(200).json(savedTag);
    } catch (error) {
        next(error);
    }
};


// Delete tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const deleteTagAction = async (req: Request<{ id: string }, {}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        await deleteTag(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Create a new tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const getTagByIdAction = async (req: Request<{ id: string }, TagDTO, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const tag = await getTagById(req.params.id);
        res.status(200).json(tag);
    } catch (error) {
        next(error);
    }
};

// Search tags
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const searchTagsAction = async (req: Request<{}, [TagDTO], undefined, { q: string }>, res: Response, next: NextFunction) => {
    try {
        const tag = await getAllTags({ name: req.query.q });
        res.status(200).json(tag);
    } catch (error) {
        next(error);
    }
};

