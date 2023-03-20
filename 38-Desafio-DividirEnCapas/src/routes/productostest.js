import { Router } from 'express';
import controller from '../controllers/products.js';

const router = Router();

router.get('/productos-test', controller.fakerProducts);

export default router;