import { Router } from "express";
import productsRouter from "./routerProduct.js";
import cartRouter from "./routerCart.js";

const router = Router();

router.use("/productos", productsRouter);
router.use("/cart", cartRouter);

export default router;