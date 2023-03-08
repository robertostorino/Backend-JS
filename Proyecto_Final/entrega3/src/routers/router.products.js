import { Router } from 'express';

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/controller.products.js';
import { isAuthorized } from '../middlewares/validateAdmin.js';

const productsRouter = Router();

productsRouter.get('/:id?', getProducts);
productsRouter.post('/', isAuthorized, createProduct);
productsRouter.put('/:id?', isAuthorized, updateProduct);
productsRouter.delete('/:id', isAuthorized, deleteProduct);

export { productsRouter };