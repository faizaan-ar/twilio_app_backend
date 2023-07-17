import { Request, Response } from "express";
import { ContactModel } from "../../sequelize/models/contact.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";

export let getContactsController = async (req: CustomRequest, res: Response) => {

    let contacts = await ContactModel.findAll({
        where: {
            accountId: req.user?.get("accountId"),
        }
    });

    res.json(contacts);

    
};