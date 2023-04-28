import { Router } from 'express';
import passport from "passport";
import UsersController from '../controllers/users.js';

const router = Router()
const controller = new UsersController();

router.get("/", controller.renderLogin);
router.post("/", passport.authenticate('login', { failureRedirect: "/login/error", successRedirect: "/" }));
router.get("/error", controller.renderFailLogin);

export default router;