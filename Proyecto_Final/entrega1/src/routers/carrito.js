const { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } = require('../controllers/carrito');

const { Router } = require('express');
const logRequestInfo = require('../middlewares/logRequestInfo');

const carritoRouter = Router();

carritoRouter.use(logRequestInfo);

carritoRouter.post('/', logRequestInfo, postCarrito);
carritoRouter.delete('/:id', logRequestInfo, deleteCarrito);
carritoRouter.get('/:id/productos', logRequestInfo, getProductosCarrito);
carritoRouter.post('/:idCart/productos/:idProd', logRequestInfo, postProductoCarrito);
carritoRouter.delete('/:idCart/productos/:idProd', logRequestInfo, deleteProductoCarrito);

module.exports = carritoRouter;