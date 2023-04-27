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

import { logger } from './src/config/logger.js';
import { clearCache } from './src/utils/clearCache.js';

// import { loginUser, signupUser, serializeUser, deserializeUser } from './src/persistence/DAOs/userDaoMongoose.js';
// import { auth } from './src/utils/authentication.js';
// import { destroyCredentials } from './src/controllers/session.controller.js';

// import { renderRoot, renderProfile, renderCart, notifyOrder } from './src/controllers/app.controller.js';

// import { postOrder } from './src/controllers/order.controller.js';

// import {  PRODUCTS_ROUTER }  from './src/routers/product.js';
// import { CART_ROUTER }  from './src/routers/cart.js';
// import { SIGNUP_ROUTER } from './src/routers/signup.js';
// import { LOGIN_ROUTER } from './src/routers/login.js';

// Imports de las rutas nuevas
import routerProducts from './src/routers/product.js';
import routerCarts from './src/routers/cart.js';
import routerOrders from './src/routers/order.js';
import routerLogin from './src/routers/login.js';
import routerLogout from './src/routers/logout.js';
import routerSignup from './src/routers/signup.js';
import routerProfile from './src/routers/profile.js';
import routerIndex from './src/routers/index.js';
import routerCartView from './src/routers/cartView.js';

import UsersController from './src/controllers/users.js';

const controllerUsers = new UsersController();

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
            secret: process.env.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            rolling: true,
            store: MongoStore.create({
                mongoUrl: process.env.MONGOOSE_URL,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                ttl: 1 * (1000 * 60),
            }),
            cookie: {
                maxAge: 10 * (1000 * 60),
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(clearCache);

    const loginStrat = new LocalStrategy(controllerUsers.loginUser);
    // const loginStrat = new LocalStrategy(loginUser);
    const signupStrat = new LocalStrategy({ passReqToCallback: true }, controllerUsers.signUpUser);
    // const signupStrat = new LocalStrategy({ passReqToCallback: true }, signupUser);
    
    // Actualizar passport con la UserController
    passport.use('login', loginStrat);
    passport.use('signup', signupStrat);
    passport.serializeUser(controllerUsers.serializeUser);
    passport.deserializeUser(controllerUsers.deserializeUser);

    app.engine('handlebars', handlebars.engine());
    app.set('views', './src/views');
    app.set('view engine', 'handlebars');

    app
        .use("/", routerIndex)
        .use("/profile", routerProfile)
        .use("/cart", routerCartView)
        .use("/login", routerLogin)
        .use("logout", routerLogout)
        .use("/signup", routerSignup)
        .use("/order", routerOrders)
        .use("/api/productos", routerProducts)
        .use("/api/carrito", routerCarts);
    // Cambiar con las rutas nuevas
    // app.get("/", auth, renderRoot)
        // .get('/profile', auth, renderProfile)
        // .get('/cart', auth, renderCart)
        // .post('/order', auth, notifyOrder)
        // .get('/logout', destroyCredentials)
        // .use('/signup', SIGNUP_ROUTER)
        // .use('/login', LOGIN_ROUTER)
        // .use("/api/productos", PRODUCTS_ROUTER)
        // .use("/api/carrito", CART_ROUTER);

    app.all('*', function (req, res){
        const { url, method } = req
        let msg = `Route ${method} ${url} not implemented`;
        logger.warn(msg)
        return Error.notImplemented(req, res);
    });

}



