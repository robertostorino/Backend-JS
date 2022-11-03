const fs = require('fs');


pathFile = "productos.txt";

/* info = JSON.parse(info);
const ids = info.map((element) => element.id);
const lastId = Math.max(...ids);

let array = await this.getAll(true);

Object.id = array.length > 0 ? parseInt(array.at(-1).id + 1) : 1; */


class Contenedor {
    constructor (pathFile) {
        this.pathFile = pathFile;
    }

    //recibe un objeto, lo guarda en el archivo y devuelve el id asignado
    /* async saveAsync(producto){
        try {
            //Si el archivo existe, lo leo
            await fs.promises.readFile(this.pathFile, 'utf-8')
        } catch (error) {
            //Si no existe, creo el array vacio
            await fs.promises.writeFile(this.pathFile, '[]')
        }
    } */

    //Devuelve un array con los objetos presentes en el archivo.
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.pathFile, "utf-8");
            return data;
        } catch (error) {
            return []; //Si no hay productos, devuelve un array vacío
        }
    }

    //recibe un objeto, lo guarda en el archivo y devuelve el id asignado
    async save(producto){
        
        let data = this.getAll();
        
        let id = 0; //Inicializo el id en 0
        let dataObj = null;

        if (data.length == 0 ){
            id = 1;
        }else {
            dataObj = JSON.parse(data); //Es el string convertido a objeto
            id = dataObj[dataObj.length - 1].id + 1; //Le paso el id del último objeto

        }

        const newObj = {id: id, ...producto}; //genero el nuevo objeto y le agrego el id correspondiente

        //push a dataObj
        dataObj.push(newObj);

        //try
        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify(dataObj, null, 2)); //el 2º parámetro :null para que no reemplace, y el 3º parámetro :2 para el espaciado
        } catch (error) {
            console.log(error);
        } 
        //catch

    }

    
    //Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(id){
        let data = this.getAll();
        let position = data.findIndex(x => x.id == id); //Me devuelve la posición del producto con el id
        let producto = null;

        if (position >= 0){
            //Lo encontró
            return producto = data[position];
        } else {
            //No lo encontró, findIndex devolvió -1
            return producto;
        }
    }


    //Elimina del archivo el objeto con el id buscado.
    async deleteById(id){
        let data = this.getAll();
        let position = data.findIndex(x => x.id == id); //Me devuelve la posición del producto con el id

        if (position < 0) {
            console.log(`No se encontró el producto con el id: ${id}`)
        } else {
                data.splice(position, 1); //Se posiciona y elimina solamente un objeto del array.
                try{
                    await fs.promises.writeFile(this.pathFile, JSON.stringify(data)); //Sobre escribo el archivo con el array modificado
                    console.log(`Se ha borrado el producto con id: ${id}`);
                } catch (error){
                    console.log("Error al borrar producto", error);
                }
            }
    }

    //Elimina todos los objetos presentes en el archivo.
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.pathFile, []);
        } catch (error){
            console.log(error);
        }
    }
}


/////////////

///  Test de la clase




async function test () {
    let producto1 = {title:'micro', price:'150usd', thumbnail:'micro.html'};
    let producto2 = {title:'mother', price:'100usd', thumbnail:'mother.html'};
    let producto3 = {title:'memoria', price:'90usd', thumbnail:'memoria.html'};

    const c1 = new Contenedor("./test.txt");

    let id1 = await c1.save(producto1);
    let id2 = await c1.save(producto1);
    let id3 = await c1.save(producto1);

    await c1.deleteById(id1);
}

test();