import { Router } from express;

import { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } from '../controllers/carrito';

//const logRequestInfo = require('../middlewares/logRequestInfo');

const carritoRouter = Router();

//carritoRouter.use(logRequestInfo);

carritoRouter
    .post('/', postCarrito)
    .delete('/:id', deleteCarrito)
    .get('/:id/productos', getProductosCarrito)
    .post('/:id/productos', postProductoCarrito)
    .delete('/:id/productos/:id_prod', deleteProductoCarrito)

export { carritoRouter };