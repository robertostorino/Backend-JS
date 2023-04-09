import Router from "koa-router";

import ProductsController from '../controllers/products.js';

const router = new Router({
    prefix: 'products'
});
const controller = new ProductsController();

router.get('/:id?', controller.getProducts);
router.post('/',  controller.insertProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct)

export default router;