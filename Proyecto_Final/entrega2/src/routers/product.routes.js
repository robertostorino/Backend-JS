import { Router } from "express";
import { productValidator } from "../"

//crear una variable admin y pasarla por parámetro en el router
const admin = true;

const Product_Router = Router();

Product_Router
    .get('/:id?', getProductos)
    .post('/', postProducto)
    .put('/:id', putProducto)
    .delete('/:id', deleteProducto)

export { Product_Router }