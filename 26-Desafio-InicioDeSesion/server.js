import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { containerMongoose } from './src/containers/containerMongoose.js';
import { normalize, denormalize, schema } from 'normalizr';
import { fakerProducts} from './src/controllers/controller.js';
import { config } from './src/constants/config.js'
//------------------------------------------------//
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import FileStore from 'sessio-file-store';
//import MongoStore from 'connect-mongo';
//------------------------------------------------//

//--------------------------------//
// NORMALIZR
//--------------------------------//
import util from 'util';
function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
};

//--------------------------------//
// PASSPORT
//--------------------------------//
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

//--------------------------------//
// BCRYPT
//--------------------------------//
import bcrypt from 'bcrypt';
// Hash password
const hashPassword = ( password ) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};


//  Initializations
const app = express(); //creo la app en express
const httpServer = createServer(app);  //Creo la del server en http importando express
const io = new Server(httpServer); //Creo un server de socketIO con el httpServer
const chat = new containerMongoose();
const productos = new containerMongoose();


/* ------------------------------- */
/*  Persistencia por Mongo  Atlas  */
/* ------------------------------- */
import MongoStore from 'connect-mongo'
const advancedOptions = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
};
//------------------------------------------------//
app.use(cookieParser("DevPass"));
app.use(session({
    /* ------------------------------- */
    /*  Express Session                */
    /* ------------------------------- */
    store: MongoStore.create({
        mongoUrl: config.mongooseURL,
        mongoOptions: advancedOptions,
        ttl: 700
    }),

    secret: "Samurai",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));
//------------------------------------------------//





//  Settings
const PORT = 8080;
app.use('/static', express.static('/public')); // Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos


/* ------------------------------- */
/*      HANDLEBARS                 */
/* ------------------------------- */

app.engine('handlebars', handlebars.engine()); // Indico que voy a utilizar el engine de Handlebars
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Views setting
app.set('views', './views')
app.set('view engine', 'handlebars')



//------------------//
// Rutas Middleware //
//------------------//
const auth = (req, res, next) => {
    if(req.session?.username){
        return next()
    } else {
        res.redirect('/login')
    }
};

//----------------//
// Rutas de login //
//----------------//
app.get('/login', (req, res) => {
    if (!req.session.username){
        res.render('login')
    } else {
        res.redirect('/')
    }
})

app.post('/login', (req, res) => {
    let user = req.body.username; //leo el username desde el body y lo almaceno en user
    req.session.username = user; //guardo el username
    res.redirect('/');
});

/* ------------------------------- */
/*      Rutas index                */
/* ------------------------------- */
app.get("/", auth, (req, res) => {
    const username = req.session?.username;
    res.render('index', { username })
}
);

/* ------------------------------- */
/*      Rutas Logout                */
/* ------------------------------- */
app.get('/logout', (req, res) => {
    const username = req.session.username;
    req.session.destroy( err => {
        if (!err) {
            res.render('logout', { username })
        } else {
            res.send({ status: 'logout error', body: err })
        }
    })
}
);



app.get("/api/productos-test", fakerProducts);  // Route for fake products

httpServer.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`)
})

httpServer.on("error", (error) => console.log("Error en servidor", error));


/* ------------------------------- */
/*      SOCKETS                    */
/* ------------------------------- */

/** Conexión realizada
*   Detecta cada socket de un cliente que se conecte
**/
io.on("connection", async (socket) => {
    
    // let messages = toSocketMessages();
        let listaMensajes = await chat.getChat()
        let strin = JSON.stringify(listaMensajes)
        let data = JSON.parse(strin)
        
        //  Mensaje original
        let mensajes = {
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
        let messagesNorm = normalize(mensajes, messagesSchema);
        let messages = messagesNorm;
        let normalized = messagesNorm;
        //  Obtiene la longitud de los mensajes original y normalizado
        const lengthObjetoOriginal = JSON.stringify(mensajes).length;
        const lengthObjNormalizado = JSON.stringify(messagesNorm).length;
        
        // //  CALCULO DE PORCENTAJE
        // const porcentajeCompresion = ( original, normalizado ) => {
        //     return  Math.trunc(100 - ( (100 * normalizado) / original ));
        // };

        // //  Compresión
        // const compression = porcentajeCompresion(lengthObjetoOriginal, lengthObjNormalizado);
        
    // let products = toSocketProducts();
        let products = await productos.get();
    
    //  PRODUCTOS

    socket.emit("products", products);

    socket.on("newProduct", async (data) => {
        // await insertProduct(data)
        await productos.add(data);               
        // products = await toSocketProducts();
        products = await productos.get();
        io.sockets.emit("products", products); //Envia productos actualizados
    });

    //MENSAJES
    
    socket.emit("messages", messages);

    socket.on("newMessage", async (data) => {
        // await insertMessage(data);
        
            // Insert a message
            if (listaMensajes.length === 0) {
                return await chat.addChat({...data, fyh: new Date().toLocaleString(), id: 1})
            }
            await chat.addChat({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1});
        
        // messages = await toSocketMessages();
            listaMensajes = await chat.getChat()
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

            // const lengthObjetoOriginal = JSON.stringify(mensajes).length;
            // const lengthObjNormalizado = JSON.stringify(messagesNorm).length;
            
            // //  CALCULO DE PORCENTAJE
            // const porcentajeCompresion = ( original, normalizado ) => {
            //     return  Math.trunc(100 - ( (100 * normalizado) / original ));
            // };

            // let compression = porcentajeCompresion(lengthObjetoOriginal, lengthObjNormalizado);
            // console.log('compresión');
            // console.log(compression);
        
        // console.log(messages);

        io.sockets.emit("messages", messages);
    });
});


