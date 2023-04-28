import { DaoCart } from "../DAOs/cartDaoMongoose.js";
import { modelCarts } from "../models/cartModel.js";
import { DaoProduct } from "../DAOs/productDaoMongoose.js";
import { modelProducts } from "../models/productModel.js";

const option = process.env.PERSISTENCE;

export class CartsDAOFactory {

    getDao() {
        let DAO;
        let daoProduct
        switch (option) {
            case "MONGO":
                daoProduct = new DaoProduct(modelProducts);
                DAO = new DaoCart(modelCarts, daoProduct);
                break;
            default:
                daoProduct = new DaoProduct(modelProducts);
                DAO = new DaoCart(modelCarts, daoProduct);
        }
        return DAO
    }
};