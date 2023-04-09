import { DaoUsers } from "../Daos/usersDaoMongoose.js";
import { modelsUsers } from "../models/modelsUsers.js"
import { persistance } from "../../../minimist.config.js"

const option = process.env.PERSISTENCE;
// const option = persistance

export class UsersDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoUsers(modelsUsers);
                break;
            default:
                DAO = new DaoUsers(modelsUsers);
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