import mongoose from 'mongoose';

const collectionProductos = "products"

const schemaProductos = new mongoose.Schema({
    id: String,
    title: String,
    price: Number,
    thumbnail: String,
})

const modelsProducts = mongoose.model(collectionProductos, schemaProductos);

export {
    modelsProducts
};