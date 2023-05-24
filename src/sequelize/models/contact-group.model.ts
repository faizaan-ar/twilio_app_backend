import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ContactModel } from "./contact.model";
import { GroupModel } from "./group.model";


interface ContactGroupAttributes {
    id?: number;
    contactId: number;
    groupId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ContactGroupCreationAttributes extends Optional<ContactGroupAttributes, 'id'> {}

@Table({
    tableName: "contact_groups",

})
export class ContactGroupModel extends Model<ContactGroupAttributes, ContactGroupCreationAttributes>{

    @ForeignKey( () => ContactModel)
    @Column(DataType.INTEGER)
    contactId: number;

    @ForeignKey( () => GroupModel)
    @Column(DataType.INTEGER)
    groupId: number;
   
}