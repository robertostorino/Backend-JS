import { DaoChat } from "../Daos/chatDaoMongoose.js";
import { modelsChat } from "../models/modelsChat.js"
import { persistance } from "../../../minimist.config.js"

const option = process.env.PERSISTENCE;
// const option = persistance

export class ChatDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoChat(modelsChat);
                break;
            default:
                DAO = new DaoChat(modelsChat);
                break;
        }
        return DAO
    }
    // static getInstance() {
    //     if(!this.instance) {
    //         this.instance = new UsersDAOFactory()
    //     }
    //     return this.instance
    // }
};