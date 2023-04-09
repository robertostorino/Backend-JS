import Router from "koa-router";

import controller from '../controllers/info.js';
import compress from 'koa-compress';

const router = new Router({
    prefix: '/'
});

router.get('/info', controller.info);

router.get('/infoCompGzip', compress(), controller.info);

export default router;