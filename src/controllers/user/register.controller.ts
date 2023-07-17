import { Request, Response } from "express";
import { AccountModel } from "../../sequelize/models/account.model";
import { UserModel } from "../../sequelize/models/user.model";

export let registerController = async (req: Request, res: Response) => {

    let data: {
        email: string; 
        password: string; 
        companyName: string; 
        name: string;
    } = req.body;

    let account = await AccountModel.create({
        companyName: data.companyName,


    });

    let user = await UserModel.create({
        email: data.email,
        password: data.password,
        name: data.name,
        accountId: account.get('id'),
        role: 'ADMIN',

    });

    res.json(user);
};