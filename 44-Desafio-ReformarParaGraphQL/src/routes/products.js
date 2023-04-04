import { Router } from 'express';
import ProductsController from '../controllers/products.js';
import { productValidator } from './middlewares/products.validator.js'

const router = Router();
const controller = new ProductsController();

router.get('/:id?', controller.getProducts);
router.post('/', productValidator, controller.insertProduct);
router.put('/:id', productValidator, controller.updateProduct);
router.delete('/:id', controller.deleteProduct)

export default router;