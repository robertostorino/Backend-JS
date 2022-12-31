import { getProductos, postProducto, putProducto, deleteProducto } from '../controllers/producto';

import { Router } from express;
//const validateAdmin = require('../middlewares/validAdmin');

//crear una variable admin y pasarla por parámetro en el router
const admin = true;

const productosRouter = Router();

productosRouter
    .get('/:id?', getProductos)
    .post('/', postProducto)
    .put('/:id', putProducto)
    .delete('/:id', deleteProducto)

export { productosRouter }