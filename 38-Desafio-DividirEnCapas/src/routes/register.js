import { Router } from 'express';
import controller from '../controllers/users.js';
import passport from "passport";

const router = Router();

router.get('/register', controller.renderRegister);

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'}));

router.get('/failregister', controller.renderFailregister);

export default router;
