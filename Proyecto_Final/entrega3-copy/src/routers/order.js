import { Router } from "express";
import { notifyOrder } from "../controllers/orders.js";
import { auth } from "./middlewares/authentication.js";

const router = Router();

router.post('/', auth, notifyOrder);

export default router;