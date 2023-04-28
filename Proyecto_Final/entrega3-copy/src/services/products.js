import { ProductRepository } from "../persistence/Repositories/productsRepository.js";

const persistence = new ProductRepository();

export default class ProductsService {
    constructor() {
        this.persistence = persistence
    }

    getAllProducts = async () => {
        return await this.persistence.getAll()
    };

    getProduct = async (id) => {
        return await this.persistence.getProduct(id)
    };

    insertProduct = async (product) => {
        return await this.persistence.add(product)
    };

    updateProduct = async (id, data) => {
        return await this.persistence.update(id, data)
    };

    deleteProduct = async (id) => {
        return await this.persistence.delete(id)
    };
};