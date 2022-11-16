const express = require('express');
const { Router } = express; //Hago destructuring de express para poder usar la función Router, en lugar de express.Router

const app = express(); //Creo la app en express y la inicializo

//Me sirve para que pueda leer formato json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use( express.static('./public')); //  Configuro para que se pueda acceder
const productos = []; //    Inicializo el array de productos vacío

const routerProductos = new Router(); //    genero el espacio donde se almacenará la ruta de productos

////  GET   ////

//  GET '/api/productos' -> devuelve todos los productos.
routerProductos.get('/', (req,res) =>{
    res.json(productos);
});

//  GET '/api/productos/:id' -> devuelve un producto según su id.
routerProductos.get('/:id', (req, res) =>{

    let id = req.params.id;
    
    if (isNaN(id)){
        return res.json( {error: "El parametro ingresado no es un numero"} );
    }

    let position = productos.findIndex(x => x.id == id); //Me devuelve la posición del producto con el id
    if (position >= 0){
        //Lo encontró
        let productoSeleccionado = productos[position];
        console.log(productoSeleccionado);
        res.json(productoSeleccionado);
    } else {
        //No lo encontró, findIndex devolvió -1
        res.json(`No se ha encontrado el producto con id: ${id}`);
    }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

routerProductos.post('/', (req, res) =>{
    let idNew; //variable para almacenar el id que se genera
    
    
    if (productos.length != 0){
        //Si hay productos
        
        idNew = productos[productos.length - 1].id + 1; //Le paso el id del último objeto
    } else {
        //Si no hay productos, entonces lo agrego con id=1
        idNew = 1;        
    };

    let producto = req.body;
    console.log(req.body);
    //Agrego el producto que se obtiene del body y le agrego el id
    productos.push({
        ...producto, ...{ id : idNew }
    })
    console.log(producto);
    res.json(`Se agregó el producto con id: ${idNew}`);
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

routerProductos.put('/:id', (req, res) =>{
    const productoNew = req.body; //Guardo la referencia en productoNew
    const { id } = req.params; //Obtengo mediante destructuring el parámetro id de la request.
    
    if (isNaN(id)) {
        return res.json( {error: "El parametro ingresado no es un número"})
    }
    
    //Busco el producto con el id indicado
    let position = productos.findIndex(x => x.id == id); //Me devuelve la posición del producto con el id
    if (position >= 0){
        //Lo encontró
        // let producto = productos[position]; // Selecciono el producto
        productos.splice(position, 1); //Se posiciona y elimina solamente un objeto del array.
        productos.push({
            ...req.body, id: id 
        });
        res.json(`Producto modificado: ${productoNew}`);
    } else {
        //No lo encontró, findIndex devolvió -1
        res.json(`No se ha encontrado el producto con id: ${id}`);
    }
})
// DELETE '/api/productos/:id' -> elimina un producto según su id.

routerProductos.delete('/:id', (req, res) =>{
    const { id } = req.params; //Obtengo mediante destructuring el parámetro id de la request.
    //Busco el producto con el id indicado
    let position = productos.findIndex(x => x.id == id); //Me devuelve la posición del producto con el id
    if (position >= 0){
        //Lo encontró
        // let producto = productos[position]; // Selecciono el producto
        productos.splice(position, 1); //Se posiciona y elimina solamente un objeto del array.
        res.json(`Se eliminó el producto con id: ${id}`);
    } else {
        //No lo encontró, findIndex devolvió -1
        res.json(`No se ha encontrado el producto con id: ${id}`);
    }
})

app.use('/api/productos', routerProductos)

const PORT = 8080; //Puerto en el que escuchará el server
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`)); //Maneja el error