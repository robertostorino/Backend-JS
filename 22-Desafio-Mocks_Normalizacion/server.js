import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import {toSocketMessages, insertMessage} from './src/controllers/messages.controller.js';
import {toSocketProducts, insertProduct, fakerProducts} from './src/controllers/products.controller.js';


//  Initializations
const app = express(); //creo la app en express
const httpServer = createServer(app);  //Creo la del server en http importando express
const io = new Server(httpServer); //Creo un server de socketIO con el httpServer


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
    let messages = toSocketMessages();
    let products = toSocketProducts();

    //  PRODUCTOS

    socket.emit("products", products);

    socket.on("newProduct", async (data) => {
        await insertProduct(data)               //guarda productos en archivo
        products = await toSocketProducts();
        io.sockets.emit("products", products); //Envia productos actualizados
    });

    //MENSAJES
    
    socket.emit("messages", messages);

    socket.on("newMessage", async (data) => {
        await insertMessage(data);
        messages = await toSocketMessages();
        io.sockets.emit("messages", messages);
    });
});
