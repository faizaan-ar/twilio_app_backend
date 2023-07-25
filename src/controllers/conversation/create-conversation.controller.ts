import { Response } from "express";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { ConversationModel } from "../../sequelize/models/conversation.model";

export async function createConversationController(req: CustomRequest, res: Response){

    let data:{
        numberId: number;
        contactId: number;
    } = req.body

    let existingConversation = await ConversationModel.findOne({
        where: {
            numberId: data.numberId,
            contactId: data.contactId
        }
    });

    if(existingConversation){
        return res.send(existingConversation);
    }

    let conversation = await ConversationModel.create({
        numberId: data.numberId,
        contactId: data.contactId,
        userId: req.user?.get("id"),
    });

    res.json(conversation);

}