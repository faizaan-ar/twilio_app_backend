import { Request, Response } from "express";
import { AccountModel } from "../../sequelize/models/account.model";
import { UserModel } from "../../sequelize/models/user.model";
import { GroupModel } from "../../sequelize/models/group.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";

export let createGroupController = async (req: CustomRequest, res: Response) => {

    let data: {
        title: string;
    } = req.body;

    let group = await GroupModel.create({
        title: data.title,
        userId: req.user?.get("id"),
        accountId: req.user?.get("accountId") as number,
    });

    res.json(group);
};