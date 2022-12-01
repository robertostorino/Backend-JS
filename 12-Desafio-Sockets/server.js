const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const path = require('path');
const productsContainer = require('../Model/productsContainer');
const chatContainer = require('../Model/chatContainer');

const products = new productsContainer('products.txt');
const chats = new chatContainer('chat.txt');

const app = express();  //creo la app en express
const httpServer = HttpServer(app);  //Creo la del server en http importando express
const io = new IOServer(httpServer);  //Creo un server de socketIO con el httpServer

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//app.use(express.static('public')); //   Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/productos')


/** Conexión realizada
*   Detecta cada socket de un cliente que se conecte
**/  
io.on('connection', async(socket) => {
    console.log("Nuevo cliente conectado");

    //Chat
    const products = await productsContainer
    HTMLFormControlsCollection.log('Cliente conectado')
})






const PORT = 8080

const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});

server.on("error", (error) => console.log("Error en servidor", error));