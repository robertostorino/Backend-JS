import { Router } from 'express';
import controller from '../controllers/register.js'
import passport from "passport";

const routerRegister = new Router();

routerRegister.get('/register', controller.register);

routerRegister.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'}));

routerRegister.get('/failregister', controller.failregister);

export default routerRegister;
