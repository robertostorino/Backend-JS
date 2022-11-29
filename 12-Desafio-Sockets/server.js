const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();  //creo la app en express
const httpServer = HttpServer(app);  //Creo la del server en http importando express
const io = new IOServer(httpServer);  //Creo un server de socketIO con el httpServer

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public')); //   Mediante el middleware express.static, indico la ruta que tendrán mis ficheros estáticos


//  Conexión realizada
io.on('connection', socket => {
    HTMLFormControlsCollection.log('Cliente conectado')
})






const PORT = 8080

const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});

server.on("error", (error) => console.log("Error en servidor", error));