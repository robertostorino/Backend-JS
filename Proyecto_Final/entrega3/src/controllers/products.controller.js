
import { config, Error } from '../constants/config.js';
import { mongoProduct } from "../models/Mongo/Mongo.models.js";
import { MongoProduct } from "../models/Mongo/Product/product.database.js";

const products = new MongoProduct(mongoProduct)

const getProducts = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const product = await products.getProduct(id)
        return product ? res.json(product) : Error.notFound(res);
    }
    let productos = await products.getAllProducts();
    res.json(productos);
}

const appendProduct = async (req, res) => {
    if (!config.admin) return Error.unauthorized(req, res);
    const saved = await products.saveProduct(req.body);
    return saved.error ? Error.notComplete(res) : res.json(saved);
}

const updateProduct = async (req, res) => {
    if (!config.admin) return Error.unauthorized(req, res);
    const { id } = req.params;
    const updated = await products.updateProduct(id, req.body);
    return updated ? res.json(updated) : Error.notFound(res);
}

const removeProduct = async (req, res) => {
    if (!config.admin) return Error.unauthorized(req, res);
    const { id } = req.params;
    const deleted = await products.deleteProduct(id);
    return deleted.error ? Error.notFound(res) : res.json(deleted);
}

export {
    getProducts,
    appendProduct,
    updateProduct,
    removeProduct
};