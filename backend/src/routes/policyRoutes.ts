import { Router } from 'express';
import { commentPolicyAction, createPolicyAction, getPoliciesAction, upVotePolicyAction } from '../controllers/policyController'
import { authenticate } from '../middlewares/authMiddleware';

const policyRouter = Router();

policyRouter.get('/', getPoliciesAction);
policyRouter.post('/', authenticate, createPolicyAction);
policyRouter.post('/:id', authenticate, upVotePolicyAction);
policyRouter.post('/:id/comment', authenticate, commentPolicyAction);


export default policyRouter;

