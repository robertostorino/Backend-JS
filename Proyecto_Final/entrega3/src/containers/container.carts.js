import mongoose from "mongoose";
import CartModel from '../models/model.carts.js';
import ProductModel from "../models/model.product.js";
import { connect } from '../middlewares/mongoConnection.js';


class CartsContainer{
    constructor(url) {
        this.url = url;
    }

    async createCart (obj) {
        let newCart = new CartModel({ timestamp: Date.now(), ...obj });
        try {
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
    };

    async addProduct (idCart, idProduct) {
        let data = null;
        try {
            let product = await ProductModel.findById(idProduct);
            data = await CartModel.updateOne({ _id: idCart}, { $push: { productos: product }});
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
        return data.modifiedCount ? `Product ${idProduct} has been correctly added to Cart ${idCart}` : 'Product could not be added';
    };

    async getByCartId (id) {
        let data = null;
        try {
            data = await CartModel.findById(id);
            return !data ? `Cart ID ${id} does not exist` : data;
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
    };

    async getAll () {
        let data = null;
        try {
            data = await CartModel.find();
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
        return (data.length > 0) ? data : 'Cart is empty';
    };

    async deleteCartById (id) {
        let data = null;
        try {
            data = await CartModel.deleteOne({ _id: id });
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
        return data.deletedCount ? `Cart id: ${id} has been deleted` : 'Cart does not exist'
    };

    async deleteCartProductById (idCart, idProduct) {
        let data = null;
        try {
            let product = await ProductModel.findById(idProduct);
            data = await CartModel.updateOne({ _id: idCart }, { $pull: { productos: product }});
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
        return data.modifiedCount 
            ? `Product ${idProduct} has been correctly deleted from Cart ${idCart}` 
            : 'Product can not be deleted'
    };
};

export { CartsContainer };