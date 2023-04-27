import { DaoProduct } from "../DAOs/productDaoMongoose.js";
import { modelProducts } from "../models/productModel.js";

const option = process.env.PERSISTANCE;

export class ProductsDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoProduct(modelProducts);
                break;
            default:
                DAO = new DaoProduct(modelProducts);
        }
        return DAO
    }
};