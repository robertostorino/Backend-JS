import { Router } from "express";
import { productValidator } from '../validators/product.validator.js';
import ProductsController from "../controllers/products.js";
// import {
//     getProducts,
//     appendProduct,
//     updateProduct,
//     removeProduct,
// } from "../controllers/products.controller.js";

// const PRODUCTS_ROUTER = Router();
const router = Router();
const controller = new ProductsController();

// PRODUCTS_ROUTER
//     .get("/:id?", controller.getProducts)
//     .post("/", productValidator, controller.appendProduct)
//     .put("/:id", productValidator, controller.updateProduct)
//     .delete("/:id", controller.removeProduct);

router.get("/:id?", controller.getProducts)
router.post("/", productValidator, controller.appendProduct)
router.put("/:id", productValidator, controller.updateProduct)
router.delete("/:id", controller.removeProduct);

// export { PRODUCTS_ROUTER }
export default router;