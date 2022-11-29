// Cliente de web socket.
// Conecta el cliente con el servidor de websocket que tenemos en http://localhost:8080
// y escucha el evento messages

const socket = io();

socket.on('messages', data => {

})