const express = require('express'); //importo el módulo express
const Contenedor = require('./contenedor.js'); //Importo el contenedor de productos

const app = express(); //Inicializo el server

const pathFile = 'productos.txt'; //Ruta donde se guarda el archivo productos

const PORT = 8080; //Puerto en el que escuchará el server

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
//Maneja el error
server.on("error", error => console.log(`Error en servidor ${error}`));


//Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor.
app.get('/productos', async (req, res) =>{
    
    const container1 = new Contenedor(pathFile); //Instancio el contenedor de productos

    const prods = await container1.getAll(); //Le paso todos los productos
    
    res.send(prods); //Devuelvo los productos en la respuesta
});

//Ruta get '/productosRandom' que devuelva un producto elegido al azar entre todos los disponibles.
app.get('/productosRandom', async (req, res) =>{

    const container1 = new Contenedor(pathFile);

    const prods = await container1.getAll(); //Obtengo todos los productos
    
    const id = parseInt(Math.random()*(prods.length)+1); //Obtiene un número entero entre 1 y el tamaño del array, luego lo convierte a entero y almacena en id

    const selectedProduct = await container1.getById(id); //Obtengo el producto con el id asignado al azar.

    res.send(selectedProduct)
})