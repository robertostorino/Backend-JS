import { Router } from 'express';
import compression from 'compression';
import controller from '../controllers/infoCompGzip.js';

const router = Router();

router.get('/infoCompGzip', compression(), controller.compress)

export default router;