import { Router } from "express";
import { notifyOrder } from "../controllers/orders.js";
import { auth } from "../utils/authentication.js"

const router = Router();

router.post('/', auth, notifyOrder);

export default router;

// import express from 'express';

// const ORDER_ROUTER = express.Router();

// ORDER_ROUTER
//     .post("/", )

// export { SIGNUP_ROUTER }