import { Router } from "express";
import { addProductToCart, createCart, deleteCart, deleteProductFromCart, getCartProducts } from '';

const cartsRouter = Router();

cartsRouter.get('/:id/productos', getCartProducts);
cartsRouter.post('/', createCart);
cartsRouter.post('/:idCart/productos/:idProduct', addProductToCart);
cartsRouter.delete('/:id', deleteCart);
cartsRouter.delete('/:idCart/productos/:idProduct', deleteProductFromCart);

export { cartsRouter };