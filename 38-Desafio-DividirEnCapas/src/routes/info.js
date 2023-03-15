import { Router } from 'express';
import controller from '../controllers/info.js';
import compression from 'compression';

const router = Router();

router.get('/info', controller.info);

router.get('/infoCompGzip', compression(), controller.info);

export default router;