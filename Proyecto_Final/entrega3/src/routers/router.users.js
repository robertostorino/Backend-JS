import express from 'express';
import { Router } from 'express';
import { UsersContainer } from '../containers/container.users.js';
import passport from 'passport';
import { passportLogin, passportRegister, serialDeserial } from '../middlewares/passport.js';
import { failLogin, getMyCart, getMyUserData, getProducts, getUser, getUserImage, logout, requireAuthentication, savePicturesLocal } from '../controllers/controller.users.js';
import { routeLogger } from '../config/logger.js'

const usersContainer = new UsersContainer();

serialDeserial();

const usersRouter = Router();

usersRouter.get('/register', (req, res) => {
    res.render('register');
});

usersRouter.post('/register', passportRegister, savePicturesLocal, 
    passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' })
);

usersRouter.get('/failregister', (req, res) => {
	res.render('register-error', { error: req });
});

usersRouter.get('/login', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/inicio');
	}
	res.render('login');
});

usersRouter.post('/login', passportLogin, 
    passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/inicio'})
);

usersRouter.get('/faillogin', failLogin);
usersRouter.get('/inicio', requireAuthentication, getUser);
usersRouter.get('/logout', logout);
usersRouter.get('/', (req,res) => {
    res.redirect('/inicio')
});

usersRouter.get('/imagen/:username', getUserImage);
usersRouter.get('/miUsuario', getMyUserData);
usersRouter.get('/miCarrito', getMyCart);
usersRouter.get('/productos/:tipo?', getProducts);

export { usersRouter };
