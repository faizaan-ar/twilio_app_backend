import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { MessageModel } from "./message.model";


interface MessagesMediaAttributes {
    id?: number;
    messageId: number;
    url: string;
    mimeType: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface MessagesMediaCreationAttributes extends Optional<MessagesMediaAttributes, 'id'> {}

@Table({
    tableName: "messages_media",

})
export class MessagesMediaModel extends Model<MessagesMediaAttributes, MessagesMediaCreationAttributes>{
    
    @ForeignKey( () => MessageModel)
    @Column(DataType.INTEGER)
    messageId: number;

    @Column(DataType.STRING(150))
    url: string;

    @Column(DataType.STRING(50))
    mimeType: string;
    
}