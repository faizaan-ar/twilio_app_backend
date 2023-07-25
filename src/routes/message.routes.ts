import { Router } from "express";
import { createMessageController } from "../controllers/message/create-message.controller";
import { getConversationMessagesController } from "../controllers/message/get-conversation-messages.controller";

export let messageRouter = Router();

messageRouter.post("/", createMessageController);
messageRouter.get("/conversation/:conversationId", getConversationMessagesController);