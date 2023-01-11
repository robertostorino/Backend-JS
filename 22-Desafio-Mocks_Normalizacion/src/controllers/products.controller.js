import { ClienteSQL } from "../models/database.model.js";
import { options } from "../options/mysql.conn.js";
import { generateFakeProds } from "../../utils/utils.js";

const bd = new ClienteSQL(options, 'products');

bd.createTable();

async function toSocketProducts(){
    return await bd.getAll();
}

async function insertProduct(product){
    await bd.save(product);
}

// Generate faker prods
async function fakerProducts (req, res) {
    let productsFaker = []; //   Generate an empty product's array
    let cant = req.query.cant || 5;
    for (let i = 0; i < cant; i++) {
        //It'll generate products and then save them
        const newProduct = generateFakeProds(); //Generate product with faker
        productsFaker.push(newProduct); //Shows new products
    }
    let exist = productsFaker.length > 0 ? true : false; // Flag if there are products exist is true, else false
    res.render("faker", { products: productsFaker, listExists: exist, layout: false}); // Render fake products
}

export {
    toSocketProducts,
    insertProduct,
    fakerProducts
};