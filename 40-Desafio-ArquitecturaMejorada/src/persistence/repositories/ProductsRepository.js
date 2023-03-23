import productsDAOFactory from "../Factories/productsDAOFactory.js";
import { transformToDto } from "../dtos/productDto.js";
import products from "../models/modelsProducts.js";

export default class ProductRepository {
    DAO

    constructor() {
        this.factory = productsDAOFactory.getInstance();
        this.DAO = this.factory.getDao()
    };

    get = async (id) => {
        const products = await this.DAO.get(id)
        return products.map(p => new Product(p))
    };

    add = async (data) => {
        const dataAdd = new this.Product(data);
        const add = await dataAdd.this.DAO.save(transformToDto(dataAdd))
        return add
    };

    update = async (id, data) => {
        const update = await this.DAO.update(id, data)
        return update
    }
}