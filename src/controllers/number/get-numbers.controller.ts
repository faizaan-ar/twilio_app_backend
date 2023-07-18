import { Request, Response, response } from "express";
import { UserModel } from "../../sequelize/models/user.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { NumberModel } from "../../sequelize/models/number.model";

export let getNumbersController = async (req: CustomRequest, res: Response) => {

   let numbers = await NumberModel.findAll({
    where:{
      accountId: req.user?.get("accountId"),
    },
   });

   res.json(numbers);
};