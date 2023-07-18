import { Optional } from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ContactModel } from "./contact.model";
import { GroupModel } from "./group.model";
import { NumberModel } from "./number.model";


interface AccountAttributes {
    id?: number;
    companyName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}

@Table({
    tableName: "accounts",

})
export class AccountModel extends Model<AccountAttributes, AccountCreationAttributes>{
    @Column(DataType.STRING(100))
    companyName: string;

    @HasMany(() => UserModel)
    users: UserModel[];

    @HasMany(() => ContactModel)
    contacts: ContactModel[];

    @HasMany(() => GroupModel)
    groups: GroupModel[];

    @HasMany(() => NumberModel)
    numbers: NumberModel[];
   
}