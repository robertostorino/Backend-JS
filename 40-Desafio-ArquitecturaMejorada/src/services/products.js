import { ProductRepository } from "../persistence/repositories/ProductsRepository.js";

const persistence = new ProductRepository();

const toSocketProducts = async () => {
    return await persistence.getAll()
};

const insertProduct = async (product) => {
    await persistence.add(product)
};

export default {
    toSocketProducts,
    insertProduct
}