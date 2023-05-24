import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ConversationModel } from "./conversation.model";


interface NumberAttributes {
    id?: number;
    userId: number;
    number: string;
    title: string;
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

    @ForeignKey( () => UserModel)
    @Column(DataType.INTEGER)
    userId: number;

    @HasMany(() => ConversationModel)
    conversations: ConversationModel[];
}