const express = require('express');
const { Router } = express; //Hago destructuring de express para poder usar la función Router, en lugar de express.Router

const app = express(); //Creo la app en express
const router = Router();

// GET '/api/productos' -> devuelve todos los productos.

// GET '/api/productos/:id' -> devuelve un producto según su id.

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

// DELETE '/api/productos/:id' -> elimina un producto según su id.

//////  NOTAS   /////////

//  Para el caso de que un producto no exista, se devolverá el objeto:
//  { error : 'producto no encontrado' }

//  Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.

//  Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.

//  El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.

//  Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.