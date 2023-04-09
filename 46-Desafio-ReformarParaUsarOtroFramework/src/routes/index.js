import Router from "koa-router";

import controller from '../controllers/index.js';
import requireAuthentication from './middlewares/requireAuthentication.js';

const router = Router();

router.get('/', requireAuthentication, controller.auth);

export default router;