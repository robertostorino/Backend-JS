import express from 'express';
import Container from '../models/Container.js';

const { Router } = express;
const productRouter = Router();

export const productContainer = new Container('./data/products.json');

productRouter.get('/:id?', validateId, getProducts);
productRouter.post('/', isAdmin, postProducts);
productRouter.put('/:id', isAdmin, existsProducts, putProducts);
productRouter.delete('/:id', isAdmin, existsProducts, deleteProducts);

export default productRouter;


//GET: '/:id?' Permite listar todos los productos disponibles ó un producto por su id (user y admin)
//POST: '/' Incorpora productos al listado (admin)
//PUT: '/' Actualiza un producto por su id (admin)
//DELETE: '/:id' Borra un producto por su id (admin)