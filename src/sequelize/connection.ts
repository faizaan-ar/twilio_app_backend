import { Sequelize } from "sequelize-typescript";
import { AccountModel } from "./models/account.model";
import { UserModel } from "./models/user.model";
import { ContactModel } from "./models/contact.model";
import { GroupModel } from "./models/group.model";
import { ContactGroupModel } from "./models/contact-group.model";
import { NumberModel } from "./models/number.model";
import { ConversationModel } from "./models/conversation.model";
import { MessageModel } from "./models/message.model";
import { MessagesMediaModel } from "./models/messages-media.model";


export function createDBConnect(){

    new Sequelize({
        host: "localhost",
        database: "client_connect_clone",
        username: "dbuser",
        password: "dbpassword",
        dialect: "postgres",
        models: [
            AccountModel,
            UserModel,
            ContactModel,
            GroupModel,
            ContactGroupModel,
            NumberModel,
            ConversationModel,
            MessageModel,
            MessagesMediaModel
        ],
    });

    AccountModel.sync({alter: true});
    UserModel.sync({alter: true});
    ContactModel.sync({alter: true});
    GroupModel.sync({alter: true});
    ContactGroupModel.sync({alter: true});
    NumberModel.sync({alter: true});
    ConversationModel.sync({alter: true});
    MessageModel.sync({alter: true});
    MessagesMediaModel.sync({alter: true});

}