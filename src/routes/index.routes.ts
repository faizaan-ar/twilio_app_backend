import {Router} from 'express';
import { accountRouter } from './account/account.routes';
import { userRouter } from './user/user.routes';
import { contactRouter } from './contact/contact.routes';
import { authorizeRequestMiddleware } from '../middlewares/authorize-request.middleware';
import { groupRouter } from './groups.routes';
import { numberRouter } from './number.routes';

export let routes = Router();

routes.use('/account', accountRouter);

routes.use('/user', userRouter);

routes.use('/contact', authorizeRequestMiddleware, contactRouter);

routes.use('/group', authorizeRequestMiddleware, groupRouter);

routes.use('/number', authorizeRequestMiddleware, numberRouter);