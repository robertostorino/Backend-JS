import { ClienteSQL } from "../models/database.model.js";
import { options } from "../options/mysql.conn.js";

const bd = new ClienteSQL(options, 'products');

bd.createTable();

async function toSocketProducts(){
    return await bd.getAll();
}

async function insertProduct(product){
    await bd.save(product);
}


export {
    toSocketProducts,
    insertProduct
};