import { Request, Response } from "express";
import { ContactModel } from "../../sequelize/models/contact.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { GroupModel } from "../../sequelize/models/group.model";
import { ContactGroupModel } from "../../sequelize/models/contact-group.model";
import { Op } from "sequelize";

export let updateContactController = async (req: CustomRequest, res: Response) => {


    let data: {
        name: string;
        email: string;
        phone: string;
        groupIds: number[];
        contactId: number;
    } = req.body;

    let response = await ContactModel.update({
        name: data.name,
        email: data.email,
        phone: data.phone,
        accountId: req.user?.get("accountId") as number,
        userId: req.user?.get("id"),
    },  {
        where: {
            id: data.contactId,    
        },
    }
    );

    let contact = await ContactModel.findOne({
        where: {
            id: data.contactId
        },
    });
    
    await ContactGroupModel.destroy({
        where: {
            contactId: data.contactId,
            groupId: {
                [Op.notIn]: data.groupIds,
            },
        },
    });

    let contactGroups = await ContactGroupModel.findAll({
        where: {
            contactId: data.contactId,
        },
    });

    let contactGroupIds = contactGroups.map((contactGroup) => {
        return contactGroup.get("groupId");
    });

    let newGroupIds = data.groupIds.filter((groupId) => {
        return !contactGroupIds.includes(groupId);
    });

    let newContactGroups = newGroupIds.map((groupId) => {
        return {
            contactId: data.contactId,
            groupId: groupId,
        };
    });

    await ContactGroupModel.bulkCreate(newContactGroups);

    res.json(contact);
    
};