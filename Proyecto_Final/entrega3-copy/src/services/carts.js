import { CartRepository } from "../persistence/Repositories/cartsRepository.js";

const persistence = new CartRepository();

export default class CartsService {
    constructor() {
        this.persistence = persistence
    }

    getCart = async (id) => {
        return this.persistence.getCart(id)
    };

    createCart = async (fromFront) => {
        const createdCart = await this.persistence.save(fromFront)
        return createdCart
    };

    deleteCart = async (id) => {
        const deletedCart = await this.persistence.deleteCart(id)
        return deletedCart
    };

    appendProductToCart = async (idCart, idProd) => {
        const appendedProduct = await this.persistence.appendProduct(idCart, idProd)
        return appendedProduct
    };

    deleteProductFromCart = async (idCart, idProd) => {
        const deletedProductFromCart = await this.persistence.deleteCartProduct(idCart, idProd)
        return deletedProductFromCart
    };

    clearCart = async (idCart) => {
        return this.persistence.clearCart(idCart)
    };
};