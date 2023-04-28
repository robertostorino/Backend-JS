import { Router } from "express";
import UsersController from "../controllers/users.js";
import passport from "passport";

const router = Router();
const controller = new UsersController();

router.get("/", controller.renderSignUp)
router.post("/", controller.savePicturesLocal, passport.authenticate('signup', { failureRedirect: "/signup/error", successRedirect: "/" }))
router.get("/error", controller.renderFailSignUp);

export default router;