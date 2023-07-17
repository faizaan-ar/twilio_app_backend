import {Router} from 'express';
import { accountRouter } from './account/account.routes';
import { userRouter } from './user/user.routes';

export let routes = Router();

routes.use('/account', accountRouter);

routes.use('/user', userRouter);