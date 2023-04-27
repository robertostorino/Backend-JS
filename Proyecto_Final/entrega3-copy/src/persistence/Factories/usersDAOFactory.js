import { DaoUser } from "../DAOs/userDaoMongoose.js";
import { modelUser } from "../models/userModel.js";

const option = process.env.PERSISTENCE;

export class UsersDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoUser(modelUser);
                break;
            default:
                DAO = new DaoUser(modelUser);
        }
        return DAO
    }
};