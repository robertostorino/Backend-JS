// import { generateFakeProds } from "../../utils/generateFakeProds.js"
import { logger } from "../config/logger.js";
import ProductsService from "../services/products.js";

const services = new ProductsService();

export default class ProductsController {
    constructor() {
        this.services = services;
    }

    getProducts = async (req, res) => {
        const { id } = req.params;
        let products = {};
        if (id) {
            products = await services.getProductById(id)
            return res.json(products)
        }
        products = await services.getAllProducts()
        return res.json(products)
    };

    toSocketProducts = async () => {
        return await this.services.getAllProducts()
    };

    insertProduct = async (req, res) => {
        let product = await services.insertProduct(req.body)
        res.json(product[0])
    };

    updateProduct = async (req, res) => {
        const { id } = req.params;
        let product = await this.services.updateProduct(id, req.body)
        res.json(product[0])
    };

    deleteProduct = async (req, res) => {
        const { id } = req.params;
        let response = await this.services.deleteProduct(id)
        res.json(response)
    };

    fakerProducts = async (req, res) => {
        const { url, method } = req
        logger.info(`Access to route: ${url} method: ${method}`)

        let productsFaker = this.services.fakerProducts(req)


        // let productsFaker = []; //   Generate an empty product's array
        // let cant = req.query.cant || 5;
        // for (let i = 0; i < cant; i++) {
        //     //It'll generate products and then save them
        //     let newProduct = generateFakeProds(); //Generate product with faker
        //     // console.log(newProduct);
        //     productsFaker.push(newProduct); //Shows new products
        //     logger.info(productsFaker)
        // }
        let exist = productsFaker.length > 0 ? true : false; // Flag if there are products exist is true, else false
        logger.info(exist);
        res.render("fake", { products: productsFaker, listExists: exist, layout: false}); // Render fake products
    }

}

// Generate fake prods
const fakerProducts = async (req, res) => {
    let productsFaker = []; //   Generate an empty product's array
    let cant = req.query.cant || 5;
    for (let i = 0; i < cant; i++) {
        //It'll generate products and then save them
        let newProduct = generateFakeProds(); //Generate product with faker
        // console.log(newProduct);
        productsFaker.push(newProduct); //Shows new products
        logger.info(productsFaker)
    }
    let exist = productsFaker.length > 0 ? true : false; // Flag if there are products exist is true, else false
    logger.info(exist);
    res.render("fake", { products: productsFaker, listExists: exist, layout: false}); // Render fake products
}

// Products

const toSocketProducts = async () => {
    return await services.getAll()
};

const insertProduct = async (product) => {
    await services.insertProduct(product)
};


// export default {
//     toSocketProducts,
//     insertProduct,
//     fakerProducts
// };