import {Router} from 'express';
import { accountRouter } from './account/account.routes';
import { userRouter } from './user/user.routes';
import { contactRouter } from './contact/contact.routes';
import { authorizeRequestMiddleware } from '../middlewares/authorize-request.middleware';
import { groupRouter } from './groups.routes';
import { numberRouter } from './number.routes';
import { messageRouter } from './message.routes';
import { conversationRouter } from './conversation.routes';
import { numberCallbackController } from '../controllers/number/number-callback.controller';

export let routes = Router();

routes.post("/number/callback", numberCallbackController);

routes.use('/account', accountRouter);

routes.use('/user', userRouter);

routes.use('/contact', authorizeRequestMiddleware, contactRouter);

routes.use('/group', authorizeRequestMiddleware, groupRouter);

routes.use('/number', authorizeRequestMiddleware, numberRouter);

routes.use('/message', authorizeRequestMiddleware, messageRouter);

routes.use('/conversation', authorizeRequestMiddleware, conversationRouter);