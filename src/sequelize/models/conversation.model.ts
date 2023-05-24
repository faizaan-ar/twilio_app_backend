import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { NumberModel } from "./number.model";
import { ContactModel } from "./contact.model";
import { MessageModel } from "./message.model";


interface ConversationAttributes {
    id?: number;
    numberId: number;
    contactId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ConversationCreationAttributes extends Optional<ConversationAttributes, 'id'> {}

@Table({
    tableName: "conversations",

})
export class ConversationModel extends Model<ConversationAttributes, ConversationCreationAttributes>{
   
    @ForeignKey( () => NumberModel)
    @Column(DataType.INTEGER)
    numberId: number;

    @ForeignKey( () => ContactModel)
    @Column(DataType.INTEGER)
    contactId: number;

    @ForeignKey( () => UserModel)
    @Column(DataType.INTEGER)
    userId: number;

    @HasMany(() => MessageModel)
    messages: MessageModel[];
    
}