import { Router } from "express";
import UsersController from "../controllers/users.js";

const router = Router();
const controller = new UsersController();

router.get("/", controller.destroyCredentials);

export default router;