const Product = require('../Model/productsContainer');
const bd = new Product('products');

function toSocketProducts(){
    let response = bd.getAll();
    return response;
}

async function insertProduct(product){
    await bd.save(product);
}

module.exports = {
    toSocketProducts,
    insertProduct
}