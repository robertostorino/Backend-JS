import * as dotenv from 'dotenv'
dotenv.config();

import express from "express";
import { createServer } from 'http';
import handlebars from "express-handlebars";
import fileUpload from 'express-fileupload';

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { logger } from './src/utils/logger.js';
import { clearCache } from './src/utils/clearCache.js';

import { loginUser, signupUser, serializeUser, deserializeUser } from './src/models/Mongo/session/session.model.js';
import { auth } from './src/utils/authentication.js';
import { destroyCredentials } from './src/controllers/session.controller.js';

import { renderRoot, renderProfile, renderCart, notifyOrder } from './src/controllers/app.controller.js';
import {  PRODUCTS_ROUTER }  from './src/routers/product.routes.js';
import { CART_ROUTER }  from './src/routers/cart.routes.js';
import { SIGNUP_ROUTER } from './src/routers/signup.routes.js';
import { LOGIN_ROUTER } from './src/routers/login.routes.js';

export function startServer(port){

    const app = express();
    const httpServer = createServer(app);

    const PORT = process.env.PORT || port;

    app.use(express.json());
    app.use(fileUpload());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use('/public/avatars/', express.static('./public/avatars'));

    httpServer.listen(PORT, () => {
        logger.info(`Servidor escuchando en el puerto http://localhost:${PORT}`)
    });

    httpServer.on("error", (error) => logger.warn("Error en servidor" + error));

    app.use(
        session({
            secret: process.env.SECRETMONGO,
            saveUninitialized: false,
            resave: false,
            rolling: true,
            store: MongoStore.create({
                mongoUrl: process.env.MONGOURL,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                ttl: process.env.TTL,
            }),
            cookie: {
                maxAge: process.env.TTL * 1000,
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(clearCache);

    const loginStrat = new LocalStrategy(loginUser);
    const signupStrat = new LocalStrategy({ passReqToCallback: true }, signupUser);

    passport.use('login', loginStrat);
    passport.use('signup', signupStrat);
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.engine('handlebars', handlebars.engine());
    app.set('views', './src/views');
    app.set('view engine', 'handlebars');

    app.get("/", auth, renderRoot)
        .get('/profile', auth, renderProfile)
        .get('/cart', auth, renderCart)
        .post('/order', auth, notifyOrder)
        .get('/logout', destroyCredentials)
        .use('/signup', SIGNUP_ROUTER)
        .use('/login', LOGIN_ROUTER)
        .use("/api/productos", PRODUCTS_ROUTER)
        .use("/api/carrito", CART_ROUTER);

    app.all('*', function (req, res){
        const { url, method } = req
        let msg = `Route ${method} ${url} not implemented`;
        logger.warn(msg)
        return Error.notImplemented(req, res);
    });

}



