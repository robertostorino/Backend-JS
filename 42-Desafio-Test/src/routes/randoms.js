import { Router } from 'express';
import controller from '../controllers/randoms.js';

const router = Router();

router.get('/api/randoms', controller.randoms)

export default router;