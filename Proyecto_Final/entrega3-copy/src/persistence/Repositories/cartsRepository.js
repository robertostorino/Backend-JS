import { CartsDAOFactory } from "../Factories/cartsDAOFactory.js";

const factory = new CartsDAOFactory();

export class CartRepository {
    DAO
    
    constructor() {
        this.DAO = factory.getDao()
    }

    getCart = async (id) => {
        return this.DAO.getCart(id)
    };

    save = async (fromFront) => {
        const savedCart = await this.DAO.saveCart(fromFront)
        return savedCart
    };

    deleteCart = async (id) => {
        const deletedCart = await this.DAO.deleteCart(id)
        return deletedCart
    };

    appendProduct = async (idCart, idProd) => {
        const appendedProduct = await this.DAO.appendProduct(idCart, idProd)
        return appendedProduct
    };

    deleteCartProduct = async (idCart, idProd) => {
        const deletedCartProduct = await this.DAO.deleteCartProduct(idCart, idProd)
        return deletedCartProduct
    };

    clearCart = async (idCart) => {
        return this.DAO.clearCart(idCart)
    };
};