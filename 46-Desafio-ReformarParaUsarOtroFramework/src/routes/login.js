import Router from "koa-router";

import controller from '../controllers/users.js';
import passport from 'passport';

const router = new Router({
    prefix: '/login'
});

router.get('/', controller.renderLogin);

router.post('/', passport.authenticate('login', { failureRedirect: '/login/faillogin', successRedirect: '/' }));

router.get('/faillogin', controller.renderFaillogin);

router.get('/logout', controller.renderLogout);

export default router;