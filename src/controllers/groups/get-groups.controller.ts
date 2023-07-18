import { Request, Response } from "express";
import { AccountModel } from "../../sequelize/models/account.model";
import { UserModel } from "../../sequelize/models/user.model";
import { GroupModel } from "../../sequelize/models/group.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";

export let getGroupsController = async (req: CustomRequest, res: Response) => {

    let groups = await GroupModel.findAll({
        where: {
            accountId: req.user?.get("accountId") as number,
        },
    });

    res.json(groups);
};