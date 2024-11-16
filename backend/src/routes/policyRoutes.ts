import { Router } from 'express';
import { createPolicyAction, getPoliciesAction, upVotePolicyAction } from '../controllers/policyController'
import { authenticate } from '../middlewares/authMiddleware';

const policyRouter = Router();

policyRouter.get('/', getPoliciesAction);
policyRouter.post('/', authenticate, createPolicyAction);
policyRouter.post('/:id', authenticate, upVotePolicyAction);

export default policyRouter;

