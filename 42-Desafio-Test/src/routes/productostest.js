import { Router } from 'express';
import ProductsController from '../controllers/products.js';

const router = Router();
const controller = new ProductsController();

router.get('/productos-test', controller.fakerProducts);

export default router;