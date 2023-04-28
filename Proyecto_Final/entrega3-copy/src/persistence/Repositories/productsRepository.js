import { ProductsDAOFactory } from "../Factories/productsDAOFactory.js";

const factory = new ProductsDAOFactory();

export class ProductRepository {
    ProductsDAOFactory
    
    constructor() {
        this.DAO = factory.getDao()
    };

    add = async (data) => {
        const addedProduct = await this.DAO.saveProduct(data)
        return addedProduct;
    };

    getProduct = async (id) => {
        return await this.DAO.getProduct(id);
    };

    getAll = async () => {
        return await this.DAO.getAllProducts();
    };

    update = async (id, data) => {
        const updated = await this.DAO.updateProduct(id, data)
        return updated;
    };

    delete = async (id) => {
        const deleted = await this.DAO.deleteProduct(id)
        return deleted;
    };
}