import { Router } from 'express';
import { fakerProducts } from '../controllers/controller.productos.js';

const router = Router();

router.get('/productos-test', fakerProducts);

export default router;