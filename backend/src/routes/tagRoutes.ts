import { Router } from 'express';
import { createTagAction, editTagAction, deleteTagAction, getTagByIdAction, searchTagsAction } from '../controllers/tagController'

const tagRouter = Router();

tagRouter.get('/', searchTagsAction);
tagRouter.get('/:id', getTagByIdAction);
tagRouter.post('/', createTagAction);
tagRouter.put('/:id', editTagAction);
tagRouter.delete('/:id', deleteTagAction);

export default tagRouter;

