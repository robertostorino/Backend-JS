import { DaoProducts } from '../Daos/productsDAOMongoose.js';
import { modelsProducts } from '../models/modelsProducts.js';
import { persistance } from "../../../minimist.config.js"

const option = process.env.PERSISTENCE;
// const option = persistance

export class ProductsDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoProducts(modelsProducts);
                break;
            default:
                DAO = new DaoProducts(modelsProducts);
        }
        return DAO
    }
    // static getInstance() {
    //     if(!this.instance) {
    //         this.instance = new ProductsDAOFactory()
    //     }
    //     return this.instance
    // }
};