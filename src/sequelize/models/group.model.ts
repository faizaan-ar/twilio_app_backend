import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ContactGroupModel } from "./contact-group.model";


interface GroupAttributes {
    id?: number;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

@Table({
    tableName: "groups",

})
export class GroupModel extends Model<GroupAttributes, GroupCreationAttributes>{
    @Column(DataType.STRING(100))
    title: string;

    @ForeignKey( () => UserModel)
    @Column(DataType.INTEGER)
    userId: number;
   
    @HasMany(() => ContactGroupModel)
    contactGroups: ContactGroupModel[];
}