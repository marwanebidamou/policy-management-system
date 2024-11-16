import { Router } from 'express';
import { createTagAction, editTagAction, deleteTagAction, getTagByIdAction, searchTagsAction } from '../controllers/tagController'
import { authenticate } from '../middlewares/authMiddleware';

const tagRouter = Router();

tagRouter.get('/', authenticate, searchTagsAction);
tagRouter.get('/:id',authenticate, getTagByIdAction);
tagRouter.post('/',authenticate, createTagAction);
tagRouter.put('/:id',authenticate, editTagAction);
tagRouter.delete('/:id',authenticate, deleteTagAction);

export default tagRouter;

