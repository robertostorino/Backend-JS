import mongoose from "mongoose";

const productosCollection = "product";

const productSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    title: { type: String, require: true, minLength: 1, maxLength: 40 },
    description: { type: String, require: true, minLength: 1, maxLength: 400 },
    code: { type: String, require: true, minLength: 1, maxLength: 10 },
    thumbnail: { type: String, require: true, minLength: 1, maxLength: 400 },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    qty: { type: Number, require: false },
    total_price: { type: Number, require: false }
});

const modelProducts = mongoose.model(productosCollection, productSchema);

export {
    modelProducts
}
