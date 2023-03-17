import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { containerMongoose } from './src/persistence/containers/containerMongoose.js';
import { normalize, schema } from 'normalizr';
// import { fakerProducts} from './src/controllers/controller.productos.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import util from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
// Passport
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import MongoStore from 'connect-mongo'
import { fork } from 'child_process';
// Logger
import { logRequest, logNotImplementedRequest } from './src/routes/middlewares/middleware.logs.js';
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
import routerProductostest from './src/routes/productostest.js';
import routerRandoms from './src/routes/randoms.js'

import userController from './src/controllers/users.js';
import productsController from './src/controllers/products.js';
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

    // //--------------------------------//
    // // BCRYPT
    // //--------------------------------//
    // // Hash password
    // //  Using bcrypt, verify password
    // const passwordOk = (password, user) => {
    //     return bcrypt.compareSync(password, user.password);
    // };

    // //  Using bcrypt, encrypt password
    // const createHash = (password) => {
    //     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // };

    //  Initializations
    const app = express(); //creo la app en express
    const httpServer = createServer(app);  //Creo la del server en http importando express
    const io = new Server(httpServer); //Creo un server de socketIO con el httpServer
    const chat = new containerMongoose();
    // const productos = new containerMongoose();
    // const usuarios = new containerMongoose();

    /* ------------------------------- */
    /*      HANDLEBARS                 */
    /* ------------------------------- */
    app.engine('handlebars', handlebars.engine()); // Indico que voy a utilizar el engine de Handlebars

    //  Views setting
    app.set('views', './views');
    app.set('view engine', 'handlebars');

    app.use(express.static('./public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(logRequest); // Aplica el middleware de logger logRequest en toda la app.
    

    //  Settings
    app.use('/static', express.static('/public')); // Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos


    httpServer.listen(port, () => {
        console.log("Server online on: ", `${process.env.HOST}:${port}`)
    });

    httpServer.on("error", (error) => logger.error("Error en servidor", error));

    /* ------------------------------- */
    /*  Persistencia por Mongo  Atlas  */
    /* ------------------------------- */
    // import MongoStore from 'connect-mongo'
    const advancedOptions = { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    //------------------------------------------------//

    app.use(cookieParser(process.env.COOKIE));
    app.use(session({
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
        }
    }));

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
    app
        .use('/', routerRegister)
        .use('/', routerLogin)
        .use('/', routerInfo)
        .use('/', routerProductostest)
        .use('/', routerIndex)
        .use('/', routerRandoms)

    app.get('*', logNotImplementedRequest, (req, res) => {
        const { url, method } = req;
        res.send(`Requested route ${url} with ${method} method is not implemented`);
    });

    /* ------------------------------- */
    /*      SOCKETS                    */
    /* ------------------------------- */
    // Conexión realizada. Detecta cada socket de un cliente que se conecte
    io.on("connection", async (socket) => {
            let listaMensajes = await chatController.toSocketMessages();
            // let listaMensajes = await chat.getChat()
            // let strin = JSON.stringify(listaMensajes)
            // let data = JSON.parse(strin)
            // //  Mensaje original
            // let mensajes = {
            //     id: 'backendCoder09',
            //     messages: data
            // };
            // // SCHEMA DESING
            // const authorSchema = new schema.Entity("author",{},{idAttribute: "email"});
            // const messageSchema = new schema.Entity("message", {
            //     author: authorSchema
            // });
            // const messagesSchema = new schema.Entity("messages", {
            //     messages: [messageSchema]
            // });
            // //  Mensaje Normalizado
            // let messagesNorm = normalize(mensajes, messagesSchema);
            // let messages = messagesNorm;
            // let normalized = messagesNorm;
            // //  Obtiene la longitud de los mensajes original y normalizado
            // const lengthObjetoOriginal = JSON.stringify(mensajes).length;
            // const lengthObjNormalizado = JSON.stringify(messagesNorm).length;
            let products = await productsController.toSocketProducts();
            // let products = await productos.get();
        
        //  PRODUCTOS
        socket.emit("products", products);
        socket.on("newProduct", async (data) => {
            await productsController.insertProduct(data)
            //await productos.add(data);               
            products = await productsController.toSocketProducts();
            // products = await productos.get();
            io.sockets.emit("products", products); //Envia productos actualizados
        });
        //MENSAJES
        socket.emit("messages", messages);
        socket.on("newMessage", async (data) => {
                // await chatController.insertMessage(data);
                // Insert a message
                if (listaMensajes.length === 0) {
                    return await chatController.insertMessage({...data, fyh: new Date().toLocaleString(), id: 1})
                    // return await chat.addChat({...data, fyh: new Date().toLocaleString(), id: 1})
                }
                await chatController.insertMessage({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1})
                // await chat.addChat({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1});
            // messages = await toSocketMessages();
                listaMensajes = await chatController.toSocketMessages();
                // listaMensajes = await chat.getChat()
                strin = JSON.stringify(listaMensajes)
                data = JSON.parse(strin)
                //  Mensaje original
                mensajes = {
                    id: 'backendCoder09',
                    messages: data
                };
                // SCHEMA DESING
                const authorSchema = new schema.Entity("author",{},{idAttribute: "email"});
                const messageSchema = new schema.Entity("message", {
                    author: authorSchema
                });
                const messagesSchema = new schema.Entity("messages", {
                    messages: [messageSchema]
                });
                //  Mensaje Normalizado
                const messagesNorm = normalize(mensajes, messagesSchema);
                let messages = messagesNorm;
                console.log("Objeto Normalizado");
                print(messagesNorm);
                console.log("  ---------   ");
            io.sockets.emit("messages", messages);
        });
    });
}