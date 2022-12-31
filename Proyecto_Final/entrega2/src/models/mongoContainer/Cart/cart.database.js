import moment from "moment";
import { config } from "../../../constants/config.js"

export class MongoCart {
    constructor(model, prodModel) {
        this.model = model
        this.prodModel = prodModel
    }

    // Private Method to get product in cart
    #getProductInCart = async (idProd, idCart) => {
        let carrito = await this.getCart(idCart);
        let producto = carrito[0].products.find((element) => element.id == idProd);
        return producto;
    }

    // Method to get cart
    getCart = async (id) => {
        let cart = await this.model.find({ id: id}, { __V: 0});
        if (cart.length == 0) return false;
        return cart;
    };

    // Method to save cart
    saveCart = async () => {
        try {
            lastId = await this.model.find({}).sort({ id: -1}).limit(1);
            let newId = (last.length > 0) ? parseInt(lastId.at(-1).id +1) : 1;
            
            // creates an empty cart
            let cart = new this.model({
                id: newId,
                timestamp: moment().format(config.timeFormat),
                product: []
            });

            const newCart = await cart.save();
            return await this.getCart(newId)

        } catch (error) {
            const response = {
                error: 1,
                message: 'Error when attempting to save cart'
            }
            return response;
        }
    }

    //  Method to delete a cart by id
    deleteCart = async (id) => {
        let response = {};
        let borrar = await this.model.deleteOne({ id: id });
        if (borrar >= 1) {
            response.error = 0,
            respose.message = `The cart with id ${id} has been deleted`;
        } else {
            response.error = 1,
            response.message = "Task uncompleted, product not found";
        }
        return response
    }

    // Method to append a product to cart
    appendProduct = async (idCart, idProd) => {
        try {
            let product = await this.prodModel.getProduct(idProd)
            if (!product || !product.length){
                return false;
            }
            let quantity = 1;
            let total_price = parseInt(product[0].price) * quantity;
            let prodtoAdd = {
                id: product[0].id,
                title: product[0].title,
                description: product[0].description,
                code: product[0].code,
                thumbnail: product[0].thumbnail,
                price: product[0].price,
                stock: product[0].stock,
                quantity,
                total_price
            }

            let isPro = await this.#getProductInCart(idProd, idCart)
            if (!isPro) {
                this.model.updateOne(
                    { id: idCart },
                    {$push: { products: prodtoAdd }},
                    (err, res) => {
                        if ( err ) return console.error(err);
                        console.log("Product added to Cart!");
                    }
                );
            } else {
                let newQuantity = isPro.quantity + 1;
                let newTotalPrice = isPro.price * newQuantity;
                this.model.updateOne(
                    { id: idCart, "products.id": idProd},
                    { "$set": { "products.$.quantity": newQuantity, "products.$.total_price": newTotalPrice }},
                    (err, res) => {
                        if (err) return console.error(err);
                        console.log("Product added to Cart!");
                    }
                )
            }
            return await this.getCart(idCart);

        } catch (error) {
            return false;
        }
    }

    //  Method to delete a product from cart
    deleteCartProduct = async (idCart, idProd) => {
        try {
            let isPro = await this.#getProductInCart(idProd, idCart)
            if (!isPro) {
                console.log(isPro)
                return false;
            }
            let quantity = isPro.quantity;
            if (quantity > 1) {
                let newQuantity = isPro.quantity -1;
                let newTotalPrice = isPro.price * newQuantity;
                this.model.updateOne(
                    { id: idCart, "products.id": idProd},
                    { "$set": { "products.$.quantity": newQuantity, "products.$.total_price": newTotalPrice} },
                    (err, res) => {
                        if (err) return console.error(err);
                        console.log("Product added to Cart!");
                    }
                );
            }
            else {
                this.model.findOneAndUpdate(
                    { id: idCart },
                    { $pull: { products: { id: idProd } }  },
                    function (err, data) { }
                );
            }

            return await this.getCart(idCart);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    
}