import mongoose from "mongoose";

const productsCollection = "products";
const cartCollection = "cart"

const productsSchema = new mongoose.Schema({
    timestamp: { type: String, require: true },
    title: { type: String, require: true, minLength: 1, maxLength: 40 },
    description: { type: String, require: true, minLength: 1, maxLength: 400 },
    code: { type: String, require: true, minLength: 1, maxLength: 10 },
    thumbnail: { type: String, require: true, minLength: 1, maxLength: 25 },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    quantity: { type: Number, require: false },
    total_price: { type: Number, require: false }
});

const cartSchema = mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    products: [ productsSchema ]
})

const mongoProduct = mongoose.model(productsCollection, productsSchema);
const mongoCart = mongoose.model(cartCollection, cartSchema);


export {
    mongoProduct,
    mongoCart
}