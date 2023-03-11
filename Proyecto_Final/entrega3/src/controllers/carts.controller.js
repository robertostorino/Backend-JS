import { Error } from '../constants/config.js';
import { mongoProduct } from "../models/Mongo/Mongo.models.js";
import { mongoCart } from "../models/Mongo/Mongo.models.js";
import { MongoProduct } from "../models/Mongo/Product/product.database.js";
import { MongoCart } from "../models/Mongo/Cart/cart.database.js";

const products = new MongoProduct(mongoProduct);
const carts = new MongoCart(mongoCart, products);

const getCart = async (req, res) => {
    const { id } = req.params;
    const cart = await carts.getCart(id)
    return cart ? res.json(cart) : Error.notFound(res);
}

const createCart = async (req, res) => {
    const saved = await carts.saveCart();
    return saved.error ? Error.notComplete(res) : res.json(saved);
}

const removeCart = async (req, res) => {
    const { id } = req.params;
    const deleted = await carts.deleteCart(id);
    return deleted ? res.json(deleted) : Error.notFound(res);
}

const addCartProduct = async (req, res) => {
    const { idCart, idProd } = req.params;
    const added = await carts.appendProduct(idCart, idProd);
    if(!added) return Error.notFound(res);
    res.json(added);
}

const removeProduct = async (req, res) => {
    const { idCart, idProd } = req.params;
    const deleted = await carts.deleteCartProduct(idCart, idProd);
    return deleted ? res.json(deleted) : Error.notFound(res);
}

export {
    getCart,
    createCart,
    removeCart,
    addCartProduct,
    removeProduct
};