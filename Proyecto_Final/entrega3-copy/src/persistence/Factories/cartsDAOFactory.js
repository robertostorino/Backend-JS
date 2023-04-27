import { DaoCart } from "../DAOs/cartDaoMongoose.js";
import { modelCarts } from "../models/cartModel.js";

const option = process.env.PERSISTENCE;

export class CartsDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoCart(modelCarts);
                break;
            default:
                DAO = new DaoCart(modelCarts);
        }
        return DAO
    }
};