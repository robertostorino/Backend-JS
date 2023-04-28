import { Router } from "express";
import ProductsController from "../controllers/products.js";
import { auth } from "./middlewares/authentication.js";

const router = Router();

const controller = new ProductsController();

router.get("/", auth, controller.renderRoot);

export default router;