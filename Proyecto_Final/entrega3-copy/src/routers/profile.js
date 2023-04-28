import { Router } from "express";
import UsersController from "../controllers/users.js";
import { auth } from "./middlewares/authentication.js";

const router = Router();
const controller = new UsersController();

router.get('/', auth, controller.renderProfile);

export default router;