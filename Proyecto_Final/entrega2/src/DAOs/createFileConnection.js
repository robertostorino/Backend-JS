import { Cart } from "../models/fileContainer/Cart/Cart.database.js";
import { Product } from "../models/fileContainer/Product/Product.database.js";

function createFilesConnection(productsCollection, cartCollection) {
    return {
        products: new Product(productsCollection),
        carts: new Cart(cartCollection),
    };
}

export { createFilesConnection }
