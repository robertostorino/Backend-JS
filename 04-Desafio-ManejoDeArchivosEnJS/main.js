const fs = require('fs');


pathFile = "./data/products.txt";

info = JSON.parse(info);
const ids = info.map((element) => element.id);
const lastId = Math.max(...ids);

let array = await this.getAll(true);

Object.id = array.length > 0 ? parseInt(array.at(-1).id + 1) : 1;


class Contenedor {
    constructor (fileName) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    //recibe un objeto, lo guarda en el archivo y devuelve el id asignado
    async saveAsync(title, price, thumbnail){
        try {
            //Si el archivo existe, lo leo
            await fs.promises.readFile(this.pathFile, 'utf-8')
        } catch (error) {
            //Si no existe, creo el array vacio
            await fs.promises.writeFile(this.pathFile, '[]')
        }
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

