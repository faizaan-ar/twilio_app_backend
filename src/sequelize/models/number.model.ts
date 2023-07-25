import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ConversationModel } from "./conversation.model";
import { AccountModel } from "./account.model";


interface NumberAttributes {
    id?: number;
    userId: number;
    number: string;
    title: string;
    accountId: number;
    twilioSid: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface NumberCreationAttributes extends Optional<NumberAttributes, 'id'> {}

@Table({
    tableName: "numbers",

})
export class NumberModel extends Model<NumberAttributes, NumberCreationAttributes>{
    @Column(DataType.STRING(100))
    title: string;

    @Column(DataType.STRING(100))
    number: string;

    @Column(DataType.STRING(255))
    twilioSid: string;

    @ForeignKey( () => UserModel)
    @Column(DataType.INTEGER)
    userId: number;

    @ForeignKey( () => AccountModel)
    @Column(DataType.INTEGER)
    accountId: number;

    @HasMany(() => ConversationModel)
    conversations: ConversationModel[];
}