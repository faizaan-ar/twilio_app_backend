import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ConversationModel } from "./conversation.model";
import { MessagesMediaModel } from "./messages-media.model";
import { AccountModel } from "./account.model";


interface MessageAttributes {
    id?: number;
    conversationId: number;
    direction: "INCOMING" | "OUTGOING";
    userId: number;
    body: string;
    sid: string;
    accountId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

@Table({
    tableName: "messages",

})
export class MessageModel extends Model<MessageAttributes, MessageCreationAttributes>{
   
    @ForeignKey( () => ConversationModel)
    @Column(DataType.INTEGER)
    conversationId: number;

    @Column(DataType.ENUM("INCOMING", "OUTGOING"))
    direction: "INCOMING" | "OUTGOING";

    @ForeignKey( () => UserModel)
    @Column(DataType.INTEGER)
    userId: number;

    @ForeignKey( () => AccountModel)
    @Column(DataType.INTEGER)
    accountId: number;

    @HasMany(() => MessagesMediaModel)
    messagesMedia: MessagesMediaModel[];

    @Column(DataType.STRING(1600))
    body: string;

    @Column(DataType.STRING(200))
    sid: string;
    
}