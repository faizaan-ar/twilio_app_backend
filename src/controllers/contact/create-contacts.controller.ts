import { Request, Response } from "express";
import { ContactModel } from "../../sequelize/models/contact.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { ContactGroupModel } from "../../sequelize/models/contact-group.model";

export let createContactController = async (req: CustomRequest, res: Response) => {

    let data: {
        name: string;
        email: string;
        phone: string;
        groupIds: number[];
    } = req.body;

    let contact = await ContactModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        accountId: req.user?.get("accountId") as number,
        userId: req.user?.get("id"),
    });

    let contactGroups = data.groupIds.map((groupId) => {
        return{
            contactId: contact.get("id"),
            groupId: groupId
        }
    })
    await ContactGroupModel.bulkCreate(contactGroups)
    res.json(contact);
    
};