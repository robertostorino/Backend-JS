import Koa from "koa";
import http from "http";
import serve from "koa-static";
import session from "koa-session";
import MongoStore from 'koa-session-mongoose';
import views from "koa-views";
import { koaBody } from "koa-body";
import handlebars from "koa-handlebars";
import compress from "koa-compress";
import Router from 'koa-router';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import util from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
// Passport
import passport from "koa-passport";
import { Strategy as LocalStrategy } from 'passport-local';
// Logger
// import { logRequest, logNotImplementedRequest } from './src/routes/middlewares/middleware.logs.js';
import { logger } from './src/config/logger.js';
import { clearCache } from './utils/clearCache.js';

//--------------------------------//
// DOTENV
//--------------------------------//
import dotenv from 'dotenv';
dotenv.config();

import routerRegister from './src/routes/register.js';
import routerLogin from './src/routes/login.js'
import routerInfo from './src/routes/info.js';
import routerIndex from './src/routes/index.js';
import routerProducts from './src/routes/products.js'
import routerProductostest from './src/routes/productostest.js';
import routerRandoms from './src/routes/randoms.js'

import userController from './src/controllers/users.js';
// import productsController from './src/controllers/products.js';
import ProductsController from './src/controllers/products.js';

import chatController from './src/controllers/chat.js';


export function startServer(port){
    //--------------------------------//
    // NORMALIZR
    //--------------------------------//
    // import util from 'util';
    function print(objeto) {
        logger.info(util.inspect(objeto,false,12,true))
    };

    //----------------------//
    // Para usar __dirname  //
    //----------------------//
    // Para poder guardar archivos sin problemas
    // import path from 'path';
    // import { fileURLToPath } from 'url';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);


    //  Initializations
    const app = new Koa(); //creo la app en express
    const httpServer = http.createServer(app.callback());  //Creo la del server en http importando express
    const io = new Server(httpServer); //Creo un server de socketIO con el httpServer
    const productsController = new ProductsController();

    const router = new Router();

    /* ------------------------------- */
    /*      HANDLEBARS                 */
    /* ------------------------------- */
    // app.engine('handlebars', handlebars.engine()); // Indico que voy a utilizar el engine de Handlebars

    //  Views setting
    // app.set('views', './views');
    // app.set('view engine', 'handlebars');
    app.use(
        views('./views', {
            extension: 'handlebars',
            map: { handlebars: 'handlebars' }
        })
    );

    // app.use(express.static('./public'));
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));

    app.use(koaBody())
    app.use(serve('public'));
    const options = { threshold: 2048 };
    app.use(compress(options));

    // app.use(logRequest); // Aplica el middleware de logger logRequest en toda la app.
    

    //  Settings
    // app.use('/static', express.static('/public')); // Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos


    httpServer.listen(port, () => {
        console.log("Server online on: ", `${process.env.HOST}:${port}`)
    });

    httpServer.on("error", (error) => logger.error("Error en servidor", error));

    /* ------------------------------- */
    /*  Persistencia por Mongo  Atlas  */
    /* ------------------------------- */
    const advancedOptions = { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    //------------------------------------------------//

    app.use(cookieParser(process.env.COOKIE));
    app.use(
        session({
            /* ------------------------------- */
            /*  Express Session                */
            /* ------------------------------- */
            store: MongoStore.create({
                mongoUrl: process.env.MONGOOSE_URL,
                mongoOptions: advancedOptions,
                collectionName: 'sessions',
                ttl: 1 * (1000 * 60)
            }),

            secret: process.env.SESSION_SECRET,
            resave: false,
            rolling: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 10 * (1000 * 60)
            },
    },
    app
    )
    );

    //-------------------------//
    // Middleware de Passport //
    //-----------------------//
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(clearCache);

    const loginStrategy = new LocalStrategy(userController.loginUser);
    const registerStrategy = new LocalStrategy(userController.registerUser);

    passport.use('login', loginStrategy);
    passport.use('register', registerStrategy);
    passport.serializeUser(userController.serializeUser);
    passport.deserializeUser(userController.deserializeUser);
    
    //-------------------//
    // Rutas 
    //-------------------//
    app.use(router.routes());
    app.use(routerRegister.routes())
    app.use(routerLogin.routes())
    app.use(routerInfo.routes())
    app.use(routerProductostest.routes())
    app.use(routerProducts.routes())
    app.use(routerIndex.routes())
    app.use(routerRandoms.routes())
    
    // app
    //     .use('/', routerRegister)
    //     .use('/', routerLogin)
    //     .use('/', routerInfo)
    //     .use('/', routerProductostest)
    //     .use('/', routerProducts)
    //     .use('/', routerIndex)
    //     .use('/', routerRandoms)

    // router.get('*', logNotImplementedRequest, (ctx) => {
    //     const { url, method } = ctx.request;
    //     res.send(`Requested route ${url} with ${method} method is not implemented`);
    // });

    /* ------------------------------- */
    /*      SOCKETS                    */
    /* ------------------------------- */
    // Conexión realizada. Detecta cada socket de un cliente que se conecte
    io.on("connection", async (socket) => {
            let listaMensajes = await chatController.getAllChat();
            let messages = await chatController.toSocketMessages();
            let products = await productsController.toSocketProducts();
        
        //  PRODUCTOS
        socket.emit("products", products);
        socket.on("newProduct", async (data) => {
            await productsController.insertProduct(data)
            products = await productsController.toSocketProducts();
            io.sockets.emit("products", products); //Envia productos actualizados
        });
        //MENSAJES
        socket.emit("messages", messages);
        socket.on("newMessage", async (data) => {
                if (listaMensajes.length === 0) {
                    return await chatController.insertMessage({...data, fyh: new Date().toLocaleString(), id: 1})
                }
                await chatController.insertMessage({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1})
                messages = await chatController.toSocketMessages();
            io.sockets.emit("messages", messages);
        });
    });
}