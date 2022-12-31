import { Router } from express;

import {
    getCart,
    createCart,
    removeCart,
    addCartProduct,
    removeProduct
} from '../controllers/cart.controller.js';

const Cart_Router = Router();

Cart_Router
    .get('/:id/productos', getCart)
    .post('/', createCart)
    .post('/:idCart/productos/:idProd', addCartProduct)
    .delete('/:idCart/productos/:idProd', removeProduct)
    .delete('/:id', removeCart);

export { Cart_Router };