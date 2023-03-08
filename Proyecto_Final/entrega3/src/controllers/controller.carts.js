import { CartsContainer } from '../containers/container.carts.js';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.MONGOOSE_URL
const cartContainer = new CartsContainer(URL);

const getCartProducts = async (req, res) => {
    let data = await cartContainer.getByCartId(req.params.id);
    res.json(data);
};

const createCart = async (req, res) => {
    let data = await cartContainer.createCart(req.body);
    res.json(data);
};

const addProductToCart = async (req, res) => {
    const { idCart, idProduct } = req.params;
    let data = await cartContainer.addProduct( idCart, idProduct );
    res.json(data);
};

const deleteCart = async (req, res) => {
    const { id } = req.params;
    let data = await cartContainer.deleteCartById(id);
    res.json(data);
};

const deleteProductFromCart = async (req, res) => {
    const { idCart, idProduct } = req.params;
    let data = await cartContainer.deleteCartProductById( idCart, idProduct );
    res.json(data);
};

export {
    getCartProducts,
    createCart,
    addProductToCart,
    deleteCart,
    deleteProductFromCart,
};