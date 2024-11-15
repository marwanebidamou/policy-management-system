import { Request, Response } from "express";
import { CreateTagDTO, TagDTO, UpdateTagDTO } from "../dtos/tag.dto";
import { createTag, updateTag, deleteTag, getAllTags, getTagById } from '../services/tagService';


// Create a new tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const createTagAction = async (req: Request<undefined, TagDTO, CreateTagDTO, undefined>, res: Response) => {
    const savedTag = await createTag(req.body);
    res.status(201).json(savedTag);
};

// Edit a tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const editTagAction = async (req: Request<{ id: string }, TagDTO, UpdateTagDTO, undefined>, res: Response) => {
    const savedTag = await updateTag(req.params.id, req.body);
    res.status(200).json(savedTag);
};


// Delete tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const deleteTagAction = async (req: Request<{ id: string }, undefined, undefined, undefined>, res: Response) => {
    const savedTag = await deleteTag(req.params.id);
    res.status(204).send();
};

// Create a new tag
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const getTagByIdAction = async (req: Request<{ id: string }, TagDTO, undefined, undefined>, res: Response) => {
    const tag = await getTagById(req.params.id);
    res.status(200).json(tag);
};

// Search tags
//ParamsDictionary, ResBody, ReqBody, ReqQuery
export const searchTagsAction = async (req: Request<undefined, [TagDTO], undefined, { q: string }>, res: Response) => {
    const tag = await getAllTags({ name: req.query.q });
    res.status(200).json(tag);
};

