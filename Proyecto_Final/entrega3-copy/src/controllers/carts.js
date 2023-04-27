import { Error } from '../constants/config.js';
import { logger } from "../config/logger.js";
import { modelProducts } from '../persistence/models/productModel.js';
import { modelCarts } from "../persistence/models/cartModel.js";
import { DaoProduct } from '../persistence/DAOs/productDaoMongoose.js';
import { DaoCart } from '../persistence/DAOs/cartDaoMongoose.js';

import CartsService from '../services/carts.js';
import { getHostName } from '../utils/miscelanius.js';

const services = new CartsService();
// const products = new DaoProduct(modelProducts);
// const carts = new DaoCart(modelCarts, products);

export default class CartsController {
    constructor() {
        this.services = services
    };

    getCart = async (req, res) => {
        const { id } = req.params;
        const cart = await services.getCart(id)
        return cart ? res.json(cart) : Error.notFound(res);
    };

    createCart = async (req, res) => {
        const saved = await services.createCart();
        return saved.error ? Error.notComplete(res) : res.json(saved);
    };

    removeCart = async (req, res) => {
        const { id } = req.params;
        const deleted = await services.deleteCart(id);
        return deleted ? res.json(deleted) : Error.notFound(res);
    };

    addCartProduct = async (req, res) => {
        const { idCart, idProd } = req.params;
        const added = await services.appendProductToCart(idCart, idProd);
        if(!added) return Error.notFound(res);
        res.json(added);
    };

    removeProduct = async (req, res) => {
        const { idCart, idProd } = req.params;
        const deleted = await services.deleteProductFromCart(idCart, idProd);
        return deleted ? res.json(deleted) : Error.notFound(res);
    };

    renderCart = async (req, res) => {
        const cartId = req.user[0].cartId;
        let cart = await services.getCart(cartId);
        let cartProducts = cart[0].products;
        let totalOrder = cartProducts.reduce((acc, objeto) => acc + objeto.total_price, 0);
        const user = req.user[0].name;
        const hostName = getHostName(req);
        const { url, method } = req
        logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
        res.render('cart_detail', { script: 'cart', user, cartId, products: cartProducts, hostName, listExists: cartProducts.length > 0, totalOrder, navBar: true })
    };

}

// const getCart = async (req, res) => {
//     const { id } = req.params;
//     const cart = await carts.getCart(id)
//     return cart ? res.json(cart) : Error.notFound(res);
// }

// const createCart = async (req, res) => {
//     const saved = await carts.saveCart();
//     return saved.error ? Error.notComplete(res) : res.json(saved);
// }

// const removeCart = async (req, res) => {
//     const { id } = req.params;
//     const deleted = await carts.deleteCart(id);
//     return deleted ? res.json(deleted) : Error.notFound(res);
// }

// const addCartProduct = async (req, res) => {
//     const { idCart, idProd } = req.params;
//     const added = await carts.appendProduct(idCart, idProd);
//     if(!added) return Error.notFound(res);
//     res.json(added);
// };

// const removeProduct = async (req, res) => {
//     const { idCart, idProd } = req.params;
//     const deleted = await carts.deleteCartProduct(idCart, idProd);
//     return deleted ? res.json(deleted) : Error.notFound(res);
// };



// export {
//     getCart,
//     createCart,
//     removeCart,
//     addCartProduct,
//     removeProduct
// };