import { Request, Response } from "express";
import { ContactModel } from "../../sequelize/models/contact.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";

export let createContactController = async (req: CustomRequest, res: Response) => {

    let data: {
        name: string;
        email: string,
        phone: string,
    } = req.body;

    let contact = await ContactModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        accountId: req.user?.get("accountId") as number,
        userId: req.user?.get("id"),
    });

    res.json(contact);
    
};