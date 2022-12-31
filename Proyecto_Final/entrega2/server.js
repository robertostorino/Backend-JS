import express from 'express';
const path = require('path');

import productRouter from './src/routers/product.routes';
import cartRouter from './src/routers/cart.routes';

const app = express();
const PORT = process.env.PORT || 8080;

//app.use( express.static(__dirname+"/public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

app.use((req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});


app.listen(PORT, () => {
  console.log(`Server online, running on http://localhost:${PORT}`);
});