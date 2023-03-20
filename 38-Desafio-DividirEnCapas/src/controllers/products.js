import services from "../services/products.js"
import {generateFakeProds} from "../../utils/generateFakeProds.js"
import { logger } from "../config/logger.js";



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
    return await services.toSocketProducts()
};

const insertProduct = async (product) => {
    await services.insertProduct(product)
};


export default {
    toSocketProducts,
    insertProduct,
    fakerProducts
};