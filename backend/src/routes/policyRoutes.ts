import { Router } from 'express';
import { commentPolicyAction, createPolicyAction, getCommentPolicyAction, getPoliciesAction, getPoliciyAction, upVotePolicyAction } from '../controllers/policyController'
import { authenticate } from '../middlewares/authMiddleware';

const policyRouter = Router();

policyRouter.get('/', getPoliciesAction);
policyRouter.get('/:id', getPoliciyAction);
policyRouter.post('/', authenticate, createPolicyAction);
policyRouter.post('/:id/upvote', authenticate, upVotePolicyAction);
policyRouter.post('/:id/comment', authenticate, commentPolicyAction);
policyRouter.get('/:id/comment', getCommentPolicyAction);



export default policyRouter;

