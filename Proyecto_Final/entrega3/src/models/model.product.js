import mongoose from 'mongoose';

const productsCollection = 'products';
const productsSchema = new mongoose.Schema({
        timestamp : {type: Date},
        nombre: {type: String, require: true, max: 100},
        descripcion: {type: String, require: true, max: 140},
        codigo: {type: Number, require: true},
        foto: {type: String, require: true},
        precio: {type: Number, require: true },
        stock: { type: Number, require: true },
        tipo: {type: String, require: true},
})

const ProductModel = mongoose.model(productsCollection, productsSchema)

export default ProductModel;