import { Request, Response, response } from "express";
import { UserModel } from "../../sequelize/models/user.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { NumberModel } from "../../sequelize/models/number.model";
import twilio from "twilio";

export let createNumberController = async (req: CustomRequest, res: Response) => {

   let client = twilio(
      process.env.TWILIO_ACCOUNT_SID as string, 
      process.env.TWILIO_AUTH_TOKEN as string
      );

   let availableNumbers = await client.availablePhoneNumbers('US').local.list({limit: 20});

   let selectedNumber = availableNumbers[0];

   let purchasedNumber = await client.incomingPhoneNumbers.create({
      phoneNumber: selectedNumber.phoneNumber,
      smsUrl: ""
   });

   let twilioSid = purchasedNumber.sid;
   let twilioNumber = purchasedNumber.phoneNumber;

   let data: {
    title: string;
   } = req.body;

   let number = await NumberModel.create({
    title: data.title,
    userId: req.user?.get("id"),
    accountId: req.user?.get("accountId") as number,
    number: twilioNumber,
    twilioSid: twilioSid
   })

   res.json(number);
};