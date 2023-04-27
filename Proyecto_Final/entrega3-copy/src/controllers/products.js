import { config, Error } from '../constants/config.js';
import { logger } from "../config/logger.js";
import { getHostName } from "../utils/miscelanius.js";
// import { modelProducts } from "../models/Mongo/productModel.js";
// import { modelProducts } from '../persistence/models/productModel.js';
// import { DaoProduct } from "../models/Mongo/Product/product.js";
// import { DaoProduct } from '../persistence/DAOs/productDaoMongoose.js';

import ProductsService from '../services/products.js';

const services = new ProductsService();

// const products = new DaoProduct(modelProducts)

export default class ProductsController {
    constructor() {
        this.services = services
    }

    getProducts = async (req, res) => {
        const { id } = req.params;
        if (id) {
            const product = await services.getProductById(id)
            return product ? res.json(product) : Error.notFound(res);
        }
        let productos = await services.getAllProducts();
        return res.json(productos);
    };

    appendProduct = async (req, res) => {
        if (!config.admin) return Error.unauthorized(req, res);
        const saved = await services.insertProduct(req.body);
        return saved.error ? Error.notComplete(res) : res.json(saved);
    };

    updateProduct = async (req, res) => {
        if (!config.admin) return Error.unauthorized(req, res);
        const { id } = req.params;
        const updated = await services.updateProduct(id, req.body);
        return updated ? res.json(updated) : Error.notFound(res);
    };

    removeProduct = async (req, res) => {
        if (!config.admin) return Error.unauthorized(req, res);
        const { id } = req.params;
        const deleted = await services.deleteProduct(id);
        return deleted.error ? Error.notFound(res) : res.json(deleted);
    };

    renderRoot = async (req, res) => {
        let products = await services.getAllProducts();
        let exist = products.length > 0
        const user = req.user[0].name;
        const cartId = req.user[0].cartId;
        const hostName = getHostName(req);
        const { url, method } = req
        logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
        res.render('index', { script: 'main', user, cartId, products, hostName, listExists: exist, navBar: true })
    };
}

// const getProducts = async (req, res) => {
//     const { id } = req.params;
//     if (id) {
//         const product = await products.getProduct(id)
//         return product ? res.json(product) : Error.notFound(res);
//     }
//     let productos = await products.getAllProducts();
//     res.json(productos);
// }

// const appendProduct = async (req, res) => {
//     if (!config.admin) return Error.unauthorized(req, res);
//     const saved = await products.saveProduct(req.body);
//     return saved.error ? Error.notComplete(res) : res.json(saved);
// }

// const updateProduct = async (req, res) => {
//     if (!config.admin) return Error.unauthorized(req, res);
//     const { id } = req.params;
//     const updated = await products.updateProduct(id, req.body);
//     return updated ? res.json(updated) : Error.notFound(res);
// }

// const removeProduct = async (req, res) => {
//     if (!config.admin) return Error.unauthorized(req, res);
//     const { id } = req.params;
//     const deleted = await products.deleteProduct(id);
//     return deleted.error ? Error.notFound(res) : res.json(deleted);
// }

// export {
//     getProducts,
//     appendProduct,
//     updateProduct,
//     removeProduct
// };