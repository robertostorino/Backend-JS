import mongoose from 'mongoose';
import { config } from '../../constants/config.js';

/**************************************Collections**********************************/
const productCollection = config.productsCollection;
const cartCollection = config.cartCollection;
const userCollection = config.userCollection;

/****************************************Schemas************************************/
const productSchema = mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    title: { type: String, require: true, minLength: 1, maxLenghth: 50 },
    description: { type: String, require: true, minLength: 1, maxLenghth: 500 },
    code: { type: String, require: true, minLength: 1, maxLenghth: 20 },
    thumbnail: { type: String, require: true, minLength: 1, maxLenghth: 20 },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    qty: { type: Number, require: false },
    total_price: { type: Number, require: false },
});

const cartSchema = mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    products: [productSchema]
})

const userSchema = mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        age: { type: Number, require: true },
        telephone:{ type: String, require: true },
        avatar:{ type: String, required: true },
        cartId: {type: Number, required: true}
    },
    { versionKey: false },
);

/****************************************Models*************************************/
const mongoUser = mongoose.model(userCollection, userSchema);
const mongoProduct = mongoose.model(productCollection, productSchema);
const mongoCart = mongoose.model(cartCollection, cartSchema);

/***********************************************************************************/
export { mongoProduct, mongoCart, mongoUser }