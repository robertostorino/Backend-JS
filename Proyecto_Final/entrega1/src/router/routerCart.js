import express from 'express';
import Container from '../models/Container.js';
import {
    funciones
} from '../src/controllers/cartHandlers'

const { Router } = express;
const cartRouter = Router();

export const cartContainer = new Container('./data/cart.json');

cartRouter.post('/', postCart);
cartRouter.delete('/:id', existsCart, deleteCart);

cartRouter.get('/:id/productos', existsCart, getCart);
cartRouter.post('/:id/productos/:id_prod', existsCart, existProductsInCart, postProductsInCart);
cartRouter.delete('/:id/productos/:id_prod', existsCart, existProductsInCart, deleteProductCart);

export default cartRouter;



//POST:'/' Crea un carrito y devuelve su id.
//DELETE: '/:id' Vacía un carrito y lo elimina.
//GET: '/:id/productos' Lista todos los productos guardados en el carrito
//POST: '/:id/productos/:id_prod' Incorpora productos al carrito por su id de producto
//DELETE '/:id/productos/:id_prod' Elimina un producto del carrito por su id de carrito y de producto
