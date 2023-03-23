import DaoProducts from '../Daos/productsDAOMongoose.js';
import modelsProducts from '../models/modelsProducts.js';

const option = process.env.PERSISTENCE;

class ProductsDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO":
                DAO = new DaoProducts(modelsProducts);
                break;
            default:
                DAO = new DaoProducts(modelsProducts);
        }
    }
    static getInstance() {
        if(!this.instance) {
            this.instance = new ProductsDAOFactory()
        }
        return this.instance
    }
};

export default { ProductsDAOFactory };