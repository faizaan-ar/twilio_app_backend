import {Router} from 'express';
import { accountRouter } from './account/account.routes';
import { userRouter } from './user/user.routes';
import { contactRouter } from './contact/contact.routes';
import { authorizeRequestMiddleware } from '../middlewares/authorize-request.middleware';

export let routes = Router();

routes.use('/account', accountRouter);

routes.use('/user', userRouter);

routes.use('/contact', authorizeRequestMiddleware, contactRouter);