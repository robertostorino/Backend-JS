import express from "express";
import router from "./src/router/routes";

export const admin = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use((req, res) => {
    res.json({error: -1, description: "Not an implemented route " + req.originalUrl})
});


//En Glitch tomará el port process.env.PORT y en local tomará el 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});


// El router base '/api/productos' implmentar las rutas disponibles según perfil

//GET: '/:id?' Permite listar todos los productos disponibles ó un producto por su id (user y admin)
//POST: '/' Incorpora productos al listado (admin)
//PUT: '/' Actualiza un producto por su id (admin)
//DELETE: '/:id' Borra un producto por su id (admin)


// En el router base '/api/carrito' implementar las rutas disponibles para usuarios y administradores

//POST:'/' Crea un carrito y devuelve su id.
//DELETE: '/:id' Vacía un carrito y lo elimina.
//GET: '/:id/productos' Lista todos los productos guardados en el carrito
//POST: '/:id/productos/:id_prod' Incorpora productos al carrito por su id de producto
//DELETE '/:id/productos/:id_prod' Elimina un producto del carrito por su id de carrito y de producto

//producto
// campos: id, timestamp, nombre, descripcion, código, foto (url), precio, stock

//carrito de compras
// estructura: id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock}

//timestamp se puede implementar con Date.now()

//Persistir productos y carrito de compras en filesystem

let administrador //variable booleana, se configurará más adelante con el sistema de login
//true o false me permite alcanzar o no las rutas indicadas.
// si recibo un request a una ruta no permitida por el perfil, devolver error.
// => { error: -1, descripcion: ruta 'x' método 'y' no autorizado }

//Ejemplo
const admin = true
app.post('/productos', () => {if (!admin) {res.send({ERORORORO})}})


/** Prueba de funcionalidad
 *  a) probar con insomnia cada endpoint (productos y carrito) y su operación en conjunto
 *  b) Realizar una app front sencilla (HTML/CSS/JS) que represente el listado de productos en forma de cards.
 *      En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar
        su información. Para este último caso incorporar los botones actualizar y eliminar.
        También tendremos un formulario de ingreso de productos nuevos con los campos
        correspondientes y un botón enviar. Asimismo, construir la vista del carrito donde se
        podrán ver los productos agregados e incorporar productos a comprar por su id de
        producto. Esta aplicación de frontend debe enviar los requests get, post, put y delete al
        servidor utilizando fetch y debe estar ofrecida en su espacio público. 
 * */