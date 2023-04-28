import { Router } from "express";
import CartsController from "../controllers/carts.js";

const router = Router();
const controller = new CartsController();

router.get('/:id/productos', controller.getCart)
router.post('/', controller.createCart)
router.post('/:idCart/productos/:idProd', controller.addCartProduct)
router.delete('/:idCart/productos/:idProd', controller.removeProduct)
router.delete('/:id', controller.removeCart);

export default router;