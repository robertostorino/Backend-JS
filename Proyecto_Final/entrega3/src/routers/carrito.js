import { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } from '../controllers/carrito.js';

import { Router } from 'express';
import { logRequestInfo }  from '../middlewares/logRequestInfo.js';

const carritoRouter = Router();

carritoRouter.use(logRequestInfo);

carritoRouter.post('/', logRequestInfo, postCarrito);
carritoRouter.delete('/:id', logRequestInfo, deleteCarrito);
carritoRouter.get('/:id/productos', logRequestInfo, getProductosCarrito);
carritoRouter.post('/:idCart/productos/:idProd', logRequestInfo, postProductoCarrito);
carritoRouter.delete('/:idCart/productos/:idProd', logRequestInfo, deleteProductoCarrito);

export { carritoRouter } ;