import DaoChat from '../Daos/chatDAOMongoose.js';
import modelsChat from '../models/modelsChat.js';

const option = process.env.PERSISTENCE;

class UsersDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoChat(modelsChat);
                break;
            default:
                DAO = new DaoChat(modelsChat);
        }
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new UsersDAOFactory()
        }
        return this.instance
    }
};

export default { UsersDAOFactory };