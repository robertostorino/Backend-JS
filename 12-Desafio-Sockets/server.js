const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const handlebars = require('express-handlebars');
// const path = require('path');
const ProductsContainer = require('../Model/productsContainer');
const ChatContainer = require('../Model/chatContainer');

const contenedorProductos = new ProductsContainer('products.txt');
const contenedorChat = new ChatContainer('chat.txt');

const app = express();  //creo la app en express
const httpServer = HttpServer(app);  //Creo la del server en http importando express
const io = new IOServer(httpServer);  //Creo un server de socketIO con el httpServer

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});
server.on("error", (error) => console.log("Error en servidor", error));


app.use('/static', express.static(__dirname + '/public')); // Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index');
});


/** Conexión realizada
*   Detecta cada socket de un cliente que se conecte
**/  
io.on('connection', async(socket) => {
    console.log("Nuevo cliente conectado");

    //Chat
    const chat = await chatContainer
    socket.emit("chats", chat);

    //Products
    const products = await contenedorProductos
    socket.emit("products", products);

    //Recibe mensaje
    socket.on("newMsg", async(data) => {
        await contenedorChat.save(data) //guarda mensaje en archivo
        //Envía mensajes actualizados
        const chat = await contenedorChat.getAll();
        io.sockets.emit("messages", chat); //envía mensajes del chat a todos los clientes
    })

    //Recibe producto
    socket.on("newProduct", async(data) => {
        await contenedorProductos.save(data); //guarda producto en archivo
        //Envia productos actualizados
        const products = await contenedorProductos.getAll();
        io.sockets.emit("products", products); //envía productos a todos los clientes
    })
})

