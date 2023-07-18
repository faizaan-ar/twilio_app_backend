import { Request, Response, response } from "express";
import { UserModel } from "../../sequelize/models/user.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";

export let createUserController = async (req: CustomRequest, res: Response) => {

    let data: {
        email: string; 
        password: string;
        name: string;
        role: 'ADMIN' | 'REGULAR' 
    } = req.body;

   let user = await UserModel.create({
    email: data.email,
    password: data.password,
    name: data.name,
    accountId: req.user?.get("accountId") as number,
    role: data.role
   })

   res.json(user);
};