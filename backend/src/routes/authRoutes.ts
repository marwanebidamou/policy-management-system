import { Router } from 'express';
import { signInAction, signUpAction } from '../controllers/authController'

const authRouter = Router();

authRouter.post('/sign-in', signInAction);
authRouter.post('/sign-up', signUpAction);


export default authRouter;

