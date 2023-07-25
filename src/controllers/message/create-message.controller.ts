import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { TwilioService } from "../../services/twilio.service";
import { ConversationModel } from "../../sequelize/models/conversation.model";
import { Response } from "express";
import { ContactModel } from "../../sequelize/models/contact.model";
import { NumberModel } from "../../sequelize/models/number.model";
import { MessageModel } from "../../sequelize/models/message.model";

export async function createMessageController(req: CustomRequest, res: Response){

    let data:{
        body: string;
        conversationId: number;
        direction: "INCOMING" | "OUTGOING";
    } = req.body

    let conversation = await ConversationModel.findOne({
        where: {
            id: data.conversationId,
        },
    });

    if(!conversation){
        return res.status(404).send("Conversation not found");
    }

    let contact = await ContactModel.findOne({
        where:{
            id: conversation.get("contactId")
        }
    })

    if(!contact){
        return res.status(404).send("Contact not found");
    }

    let number = await NumberModel.findOne({
        where: {
            id: conversation.get("numberId")
        }
    });

    if(!number){
        return res.status(404).send("Number not found");
    }

    let response = await TwilioService.client().messages.create({
        to: contact.get("phone"),
        from: number.get("number"),
        body: data.body, 
    });

    let message = await MessageModel.create({
        body: data.body,
        conversationId: data.conversationId,
        direction: data.direction,
        userId: req.user?.get("id"),
        accountId: req.user?.get("accountId") as number,
        sid: response.sid,
    })

    res.json(message);
}