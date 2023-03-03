import { getProductos, postProducto, putProducto, deleteProducto } from '../controllers/producto.js';

import { Router } from 'express';
import { validateAdmin } from '../middlewares/validAdmin.js';

//crear una variable admin y pasarla por parámetro en el router
const admin = true;

const productosRouter = Router();

productosRouter.get('/:id?', getProductos);
productosRouter.post('/', validateAdmin(admin), postProducto);
productosRouter.put('/:id', validateAdmin(admin), putProducto);
productosRouter.delete('/:id', validateAdmin(admin), deleteProducto);

export { productosRouter };