import { Request, Response, response } from "express";
import { UserModel } from "../../sequelize/models/user.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { NumberModel } from "../../sequelize/models/number.model";

export let createNumberController = async (req: CustomRequest, res: Response) => {

   let data: {
    title: string;
   } = req.body;

   let number = await NumberModel.create({
    title: data.title,
    userId: req.user?.get("id"),
    accountId: req.user?.get("accountId") as number,
    number: '232322323'
   })

   res.json(number);
};