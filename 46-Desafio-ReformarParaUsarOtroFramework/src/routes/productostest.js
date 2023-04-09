import Router from "koa-router";

import ProductsController from '../controllers/products.js';

const router = new Router({
    prefix: '/api'
});
const controller = new ProductsController();

router.get('/productos-test', controller.fakerProducts);

export default router;