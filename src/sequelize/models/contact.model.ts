import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ContactGroupModel } from "./contact-group.model";
import { ConversationModel } from "./conversation.model";
import { AccountModel } from "./account.model";


interface ContactAttributes {
    id?: number;
    name: string;
    email: string;
    phone: string;
    userId: number;
    accountId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

@Table({
    tableName: "contacts",

})
export class ContactModel extends Model<ContactAttributes, ContactCreationAttributes>{
    @Column(DataType.STRING(100))
    name: string;

    @Column(DataType.STRING(100))
    email: string;

    @Column(DataType.STRING(100))
    phone: string;

    @ForeignKey( () => UserModel)
    @Column(DataType.INTEGER)
    userId: number;

    @ForeignKey( () => AccountModel)
    @Column(DataType.INTEGER)
    accountId: number;
    
    @HasMany(() => ContactGroupModel)
    contactGroups: ContactGroupModel[];

    @HasMany(() => ConversationModel)
    conversations: ConversationModel[];
}