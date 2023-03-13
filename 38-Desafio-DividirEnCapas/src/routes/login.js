import { Router } from 'express';
import controller from '../controllers/login.js';
import passport from 'passport';

const router = Router();

router.get('/login', controller.login);

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' }));

router.get('/faillogin', controller.faillogin);

export default router;