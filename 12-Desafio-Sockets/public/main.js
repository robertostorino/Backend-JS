// Cliente de web socket.
// Conecta el cliente con el servidor de websocket que tenemos en http://localhost:8080
// y escucha el evento messages

const socket = io();

//data tendrá el array de mensajes que envía el servidor

socket.on('messages', data => {

})