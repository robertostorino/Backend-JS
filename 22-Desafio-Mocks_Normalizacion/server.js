import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
//import {toSocketMessages, insertMessage} from './src/controllers/messages.controller.js';
//import {toSocketProducts, insertProduct, fakerProducts} from './src/controllers/products.controller.js';
import { containerMongoose } from './src/containers/containerMongoose.js';
import { normalize, denormalize, schema } from 'normalizr';

import util from 'util';
import { fakerProducts} from './src/controllers/controller.js';
// import productos from '../22-pruebaDario/routers/routers.js';


//  Initializations
const app = express(); //creo la app en express
const httpServer = createServer(app);  //Creo la del server en http importando express
const io = new Server(httpServer); //Creo un server de socketIO con el httpServer
const chat = new containerMongoose();
const productos = new containerMongoose();

//  Settings
const PORT = 8080;
app.use('/static', express.static('/public')); // Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos

//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine()); // Indico que voy a utilizar el engine de Handlebars

app.use(express.static('./public'))

//  Views setting
app.set('views', './views')
app.set('view engine', 'handlebars')

app.get("/", (req, res) => {
    res.render('index');
});

// Route for fake products
app.get("/api/productos-test", fakerProducts);

httpServer.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`)
})

httpServer.on("error", (error) => console.log("Error en servidor", error));

/** Conexión realizada
*   Detecta cada socket de un cliente que se conecte
**/
io.on("connection", async (socket) => {
    
    // let messages = toSocketMessages();
        const listaMensajes = await chat.getChat()
        const strin = JSON.stringify(listaMensajes)
        const data = JSON.parse(strin)
        
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
        const messagesNorm = normalize(mensajes, messagesSchema);
        let messages = messagesNorm;

        //  Obtiene la longitud de los mensajes original y normalizado
        const lengthObjetoOriginal = JSON.stringify(mensajes).length;
        const lengthObjNormalizado = JSON.stringify(messagesNorm).length;
        
        //  CALCULO DE PORCENTAJE
        const porcentajeCompresion = ( original, normalizado ) => {
            return  Math.trunc(100 - ( (100 * normalizado) / original ));
        };

        //  Compresión
        const compression = porcentajeCompresion(lengthObjetoOriginal, lengthObjNormalizado);
        
    // let products = toSocketProducts();
        let products = await productos.get();
    
    //  PRODUCTOS

    socket.emit("products", products);

    socket.on("newProduct", async (data) => {
        // await insertProduct(data)
        await products.add(data);               
        // products = await toSocketProducts();
        products = await products.get();
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
        io.sockets.emit("messages", messages);
    });
});

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
};
