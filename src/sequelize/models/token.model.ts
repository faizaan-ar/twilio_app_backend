import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";


interface TokenAttributes {
    id?: number;
    token: string;
    type: "access" | "refresh";
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

@Table({
    tableName: "tokens",

})
export class TokenModel extends Model<TokenAttributes, TokenCreationAttributes>{
    @Column(DataType.STRING(1000))
    token: string;

    @Column(DataType.STRING(10))
    type: "access" | "refresh";

    @Column(DataType.INTEGER)
    @ForeignKey(() => UserModel)
    userId: number;

}