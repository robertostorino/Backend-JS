const fs = require('fs');


pathFile = "./data/products.txt";

info = JSON.parse(info);
const ids = info.map((element) => element.id);
const lastId = Math.max(...ids);

let array = await this.getAll(true);

Object.id = array.length > 0 ? parseInt(array.at(-1).id + 1) : 1;


class Contenedor {
    constructor (ruta) {
        this.ruta = ruta
    }

    //recibe un objeto, lo guarda en el archivo y devuelve el id asignado
    async saveAsync(producto){
        try {
            //Si el archivo existe, lo leo
            await fs.promises.readFile(this.pathFile, 'utf-8')
        } catch (error) {
            //Si no existe, creo el array vacio
            await fs.promises.writeFile(this.pathFile, '[]')
        }
    }

    //recibe un objeto, lo guarda en el archivo y devuelve el id asignado
    async saveAsync(producto){
        let data = 0;
        let dataObj = null;
        try {
             //Si el archivo existe, lo leo
            data = await fs.promises.readFile(this.pathFile, 'utf-8')
        } catch (error) {
            //Si no existe, creo el array vacio
            await fs.promises.writeFile(this.pathFile, '[]')
        }
        let id = 0;
        if (data.length == 0 ){
            let id = 1
        }else {
            dataObj = JSON.parse(data);
            let id = dataObj[dataObj.length - 1].id + 1

        }

        const newObj = {id: id, ...producto}

        //push a dataObj

        //try
        await fs.promises.writeFile(this.pathFile, JSON.stringify(neObj, null, 2))
        //catch

    }

    //Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(idNumber){

    }

    //Devuelve un array con los objetos presentes en el archivo.
    getAll(){

    }

    //Elimina del archivo el objeto con el id buscado.
    deleteById(){

    }

    //Elimina todos los objetos presentes en el archivo.
    deleteAll(){

    }
}





save( title, price ){
    try{
        let data = fs.readFileSync('./Productos.txt', 'utf-8')
            if( data == 0 ){
                let id = 1
                fs.writeFileSync('./Productos.txt', JSON.stringify({ id, title, price }))
                console.log("agregue un objeto nuevo porque no habia nada")
            }else{
                let data = JSON.parse( fs.readFileSync( './Productos.txt', 'utf-8' ) )
                let id = data.id + 1
                fs.appendFileSync('./Productos.txt', JSON.stringify({ id, title, price }))
                console.log("Ya tenia algo, agregue un producto nuevo")
            }
    } catch(err){
        throw new Error(`Error en la escritura del archivo: ` + err)
    }
}

