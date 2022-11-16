///  Test de Contenedor
const Contenedor = require('./contenedor');

const pathFile = 'productos.txt';

const productos = new Contenedor(pathFile)
const test = async () => {
    
    let producto1 = { "title": "pc", "price" : 80000, "thumbnail": "pc.jpg"};
    let producto2 = { "title": "monitor", "price" : 30000, "thumbnail": "monitor.jpg"};
    let producto3 = { "title": "impresora", "price" : 30000, "thumbnail": "impresora.jpg"};

    console.log('Se limpia el archivo de productos \n')
    await productos.deleteAll();

    // Cargo los productos y los almaceno
    
    let id = await productos.save(producto1);
    console.log(`Se ha creado el producto con id:  ${id}`);

    id = await productos.save(producto2);
    console.log(`Se ha creado el producto con id:  ${id}`);
    
    id = await productos.save(producto3);
    console.log(`Se ha creado el producto con id:  ${id}`);
    
    console.log('\n\n');

    // Muestra todos los productos
    let todos = await productos.getAll();
    console.log('Se muestran todos los productos en archivo: ')
    console.log(todos);

    console.log('\n');

    //Traigo el producto con id: 2
    let productoSeleccionado = await productos.getById(2);
    console.log('Muestra el producto seleccionado: ');
    console.log(productoSeleccionado);

    //Elimino un producto por id
    console.log('\n');
    await productos.deleteById(2);

    // Muestra todos los productos
    todos = await productos.getAll();
    console.log('Se muestran todos los productos en archivo: ')
    console.log(todos);
    
}
test();