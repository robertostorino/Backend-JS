import { logger } from "../config/logger.js";
import ProductsService from "../services/products.js";

const services = new ProductsService();

export default class ProductsController {
    constructor() {
        this.services = services;
    }

    getProducts = async ctx => {
        const { id } = ctx.params;
        // const { id } = req.params;
        let products = {};
        if (id) {
            products = await services.getProductById(id)
            ctx.body = products;
            // return res.json(products)
        }
        products = await services.getAllProducts()
        ctx.body = products;
        // return res.json(products)
    };

    toSocketProducts = async () => {
        return await this.services.getAllProducts()
    };

    insertProduct = async ctx => {
        let data = ctx;
        if (!ctx.title) data = ctx.request.body;
        const product = await services.insertProduct(data);
        ctx.body = product;
        // let product = await services.insertProduct(req.body)
        // res.json(product)
    };

    updateProduct = async ctx => {
        const { id } = ctx.params;
        const product = await services.updateProduct(id, ctx.request.body);
        ctx.body = product;
        // const { id } = req.params;
        // let product = await this.services.updateProduct(id, req.body)
        // res.json(product)
    };

    deleteProduct = async ctx => {
        const { id } = ctx.params;
        const response = await services.deleteProduct(id);
        ctx.body = response;
        // const { id } = req.params;
        // let response = await this.services.deleteProduct(id)
        // res.json(response)
    };

    fakerProducts = async ctx => {
        // const { url, method } = req
        const { url, method } = ctx.request;
        logger.info(`Access to route: ${url} method: ${method}`);
        let productsFaker = services.fakerProducts(ctx.query.cant);
        let exist = productsFaker.length > 0 ? true : false; // Flag if there are products exist is true, else false
        if (!exist) logger.warn(`Error generating mock data`);
        await ctx.render("fake", { products: productsFaker, listExists: exist, layout: false})
        // let productsFaker = this.services.fakerProducts(req)
        // let exist = productsFaker.length > 0 ? true : false; // Flag if there are products exist is true, else false
        // logger.info(exist);
        // res.render("fake", { products: productsFaker, listExists: exist, layout: false}); // Render fake products
    }

}