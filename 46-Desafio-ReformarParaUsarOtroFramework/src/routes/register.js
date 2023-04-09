import Router from "koa-router";

import controller from '../controllers/users.js';
import passport from "passport";

const router = new Router({
    prefix: '/register'
});

router.get('/', controller.renderRegister);

router.post('/', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'}));

router.get('/failregister', controller.renderFailregister);

export default router;
