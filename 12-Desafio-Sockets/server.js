const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const handlebars = require('express-handlebars');
// const path = require('path');
const { toSocketProducts, insertProduct } = require('./src/controllers/products.controllers');
const { toSocketMessages, insertMessage } = require('./src/controllers/messages.controllers');

const app = express();  //creo la app en express
const httpServer = HttpServer(app);  //Creo la del server en http importando express
const io = new IOServer(httpServer);  //Creo un server de socketIO con el httpServer

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});
server.on("error", (error) => console.log("Error en servidor", error));

app.use('/static', express.static(__dirname + '/public')); // Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.engine('handlebars', handlebars.engine()); // Indico que voy a utilizar el engine de Handlebars
app.set('views', './views');
app.set('view engine', 'handlebars')

app.get("/", (req, res) => {
    res.render('index');
});


/** Conexión realizada
*   Detecta cada socket de un cliente que se conecte
**/  
io.on('connection', async(socket) => {
    console.log("Nuevo cliente conectado");

    let messages = toSocketMessages();
    let products = toSocketProducts();

    //  PRODUCTOS

    socket.emit("products", products);

    socket.on("newProduct", async (data) => {
        await insertProduct(data);              //guarda productos en archivo
        products = toSocketProducts();
        io.sockets.emit("products", products);  //Envia productos actualizados
        return false
    });

    //MENSAJES

    socket.emit("messages", messages);

    socket.on("newMessage", async (data) => {
        await insertMessage(data);
        messages = toSocketMessages();
        io.sockets.emit("messages", messages);
        return false
    });
    
})

