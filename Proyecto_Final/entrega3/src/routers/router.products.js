import { Router } from 'express';

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/controller.products.js';
import { isAuthoraized } from '../middlewares/validateAdmin.js';

const productsRouter = Router();

productsRouter.get('/:id?', getProducts);
productsRouter.post('/', isAuthoraized, createProduct);
productsRouter.put('/:id?', isAuthoraized, updateProduct);
productsRouter.delete('/:id', isAuthoraized, deleteProduct);

export { productsRouter };