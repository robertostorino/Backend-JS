import { Router } from "express";
import { productValidator } from "./middlewares/products.validator.js";
import ProductsController from "../controllers/products.js";

const router = Router();
const controller = new ProductsController();

router.get("/:id?", controller.getProducts)
router.post("/", productValidator, controller.appendProduct)
router.put("/:id", productValidator, controller.updateProduct)
router.delete("/:id", controller.removeProduct);

export default router;