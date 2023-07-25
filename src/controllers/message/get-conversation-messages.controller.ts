import { Response } from "express";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { MessageModel } from "../../sequelize/models/message.model";

export async function getConversationMessagesController(req: CustomRequest, res: Response){
    let messages = await MessageModel.findAll({
        where: {
            conversationId: req.params.conversationId,
            accountId: req.user?.get("accountId"),
        },
    });
    
    res.json(messages);
}