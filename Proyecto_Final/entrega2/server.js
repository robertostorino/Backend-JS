import express from 'express';

import { Product_Router} from './src/routers/product.routes.js';
import { Cart_Router } from './src/routers/cart.routes';

const app = express();
const PORT = process.env.PORT || 8080;

import { Error } from './src/constants/config.js';

app.get("/", (req, res) => {
  res.send('<h1 style="color:green"> Bienvenidos al Servidor Express </h1>');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', Product_Router);
app.use('/api/carrito', Cart_Router);

app.get('*', function (req, res){
  return Error.notImplemented(req, res);
});

const server = app.listen(PORT, () => {
  console.log(`Server online, running on http://localhost:${PORT}`);
});

server.on("error", (error) => console.log("Error on Server", error));