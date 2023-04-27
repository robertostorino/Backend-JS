import mongoose from "mongoose";
import { modelProducts } from "./productModel.js";

const carritoCollection = "cart";

const cartSchema = mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    products: [ modelProducts.schema ]
})

const modelCarts = mongoose.model(carritoCollection, cartSchema);

export {
    modelCarts
}
