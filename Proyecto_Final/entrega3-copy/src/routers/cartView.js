import { Router } from "express";
import CartsController from "../controllers/carts.js";
import { auth } from "./middlewares/authentication.js";

const router = Router();
const controller = new CartsController();

router.get('/', auth, controller.renderCart);

export default router;