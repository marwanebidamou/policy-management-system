import { Router } from 'express';
import { signInAction } from '../controllers/authController'

const authRouter = Router();

authRouter.post('/sign-in', signInAction);

export default authRouter;

