import DaoUsers from '../Daos/usersDAOMongoose.js';
import modelsUsers from '../models/modelsUsers.js';

const option = process.env.PERSISTENCE;

class UsersDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoUsers(modelsUsers);
                break;
            default:
                DAO = new DaoUsers(modelsUsers);
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