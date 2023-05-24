import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AccountModel } from "./account.model";
import { ContactModel } from "./contact.model";
import { GroupModel } from "./group.model";
import { NumberModel } from "./number.model";
import { ConversationModel } from "./conversation.model";
import { MessageModel } from "./message.model";


interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    role: 'REGULAR' | 'ADMIN';
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
    tableName: "users",

})
export class UserModel extends Model<UserAttributes, UserCreationAttributes>{
    @Column(DataType.STRING(100))
    name: string;
   
    @Column(DataType.STRING(100))
    email: string;
    
    @Column(DataType.ENUM("REGULAR", "ADMIN"))
    role: string;
    
    @Column(DataType.STRING(255))
    password: string;

    @ForeignKey( () => AccountModel)
    @Column(DataType.INTEGER)
    accountId: number;

    @HasMany(() => ContactModel)
    contacts: ContactModel[];

    @HasMany(() => GroupModel)
    groups: GroupModel[];

    @HasMany(() => NumberModel)
    numbers: NumberModel[];

    @HasMany(() => ConversationModel)
    conversations: ConversationModel[];

    @HasMany(() => MessageModel)
    messages: MessageModel[];
}