import { DaoProducts } from "../persistence/Daos/productsDaoMongoose.js";
import { modelsProducts } from "../persistence/models/modelsProducts.js"

const persistence = new DaoProducts(modelsProducts);

const toSocketProducts = async () => {
    return await persistence.get()
};

const insertProduct = async (product) => {
    await persistence.add(product)
};

export default {
    toSocketProducts,
    insertProduct
}