import Router from "koa-router";

import controller from '../controllers/randoms.js';

const router = new Router({
    prefix: '/api'
});

router.get('/randoms', controller.randoms)

export default router;