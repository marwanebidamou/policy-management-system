import { Router } from 'express';
import { createPolicyAction, getPoliciesAction } from '../controllers/policyController'
import { authenticate } from '../middlewares/authMiddleware';

const policyRouter = Router();

policyRouter.get('/', getPoliciesAction);
policyRouter.post('/', authenticate, createPolicyAction);

export default policyRouter;

