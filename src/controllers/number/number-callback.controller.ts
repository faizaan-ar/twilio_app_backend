import { Request, Response, response } from "express";
import { UserModel } from "../../sequelize/models/user.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { NumberModel } from "../../sequelize/models/number.model";
import { ContactModel } from "../../sequelize/models/contact.model";
import { ConversationModel } from "../../sequelize/models/conversation.model";
import { MessageModel } from "../../sequelize/models/message.model";

export let numberCallbackController = async (req: CustomRequest, res: Response) => {

  res.send("OK");
  console.log(req.body);

  let number = await NumberModel.findOne({
    where: {
      number: req.body.To,
    },
  });
  
  if(!number){
    return;
  }

  let contact = await ContactModel.findOne({
    where: {
      phone: req.body.From
    }
  });

  if(!contact){
    contact = await ContactModel.create({
      name: "Unknown",
      phone: req.body.From,
      accountId: number.get("accountId") as number,
      userId: number.get("userId") as number,
      email: "",
    })
  }

  let conversation = await ConversationModel.findOne({
    where: {
      numberId: number.get("id"),
      contactId: contact.get("id")
    }
  });
  
  if(!conversation){
    conversation = await ConversationModel.create({
      numberId: number.get("id"),
      contactId: contact.get("id"),
      userId: number.get("userId") as number
    });
  }

  await MessageModel.create({
    conversationId: conversation.get("id"),
    body: req.body.Body,
    direction: "INCOMING",
    userId: number.get("userId") as number,
    accountId: number.get("accountId") as number,
    sid: req.body.MessageSid,
  })
   
};