import { Request, Response } from "express";
import { ContactModel } from "../../sequelize/models/contact.model";
import { CustomRequest } from "../../middlewares/authorize-request.middleware";
import { GroupModel } from "../../sequelize/models/group.model";
import { ContactGroupModel } from "../../sequelize/models/contact-group.model";
import { Op } from "sequelize";

export let updateContactController = async (req: CustomRequest, res: Response) => {

    try{
        let data: {
            name: string;
            email: string;
            phone: string;
            groupIds: number[];
            contactId: number;
        } = req.body;

        let updateData:any ={
            accountId: req.user?.get("accountId") as number,
        };

        if (data.name) updateData.name = data.name;
        if (data.email) updateData.email = data.email;
        if (data.phone) updateData.phone = data.phone;

        let response = await ContactModel.update(updateData, {
            where: {
                id: data.contactId,
                userId: req.user?.get("id"),    
            },
        });

        let contact = await ContactModel.findOne({
            where: {
                id: data.contactId
            },
        });

        if(data.groupIds){
            await updateGroups(data);
        }
        res.json(contact);
    }
    catch(e: any){
        res.status(500).json({
            message: e.message,
        });
    }
    
};

async function updateGroups(data: any){
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

    let newGroupIds = data.groupIds.filter((groupId: any) => {
        return !contactGroupIds.includes(groupId);
    });

    let newContactGroups = newGroupIds.map((groupId: any) => {
        return {
            contactId: data.contactId,
            groupId: groupId,
        };
    });

    await ContactGroupModel.bulkCreate(newContactGroups);
}