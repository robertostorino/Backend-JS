import Router from "koa-router";

import controller from '../controllers/users.js';
import passport from 'passport';

const router = Router();

router.get('/login', controller.renderLogin);

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' }));

router.get('/faillogin', controller.renderFaillogin);

router.get('/logout', controller.renderLogout);

export default router;