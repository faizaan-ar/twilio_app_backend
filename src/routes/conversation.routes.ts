import { Router } from "express";
import { createConversationController } from "../controllers/conversation/create-conversation.controller";


export let conversationRouter = Router();

conversationRouter.post("/", createConversationController);