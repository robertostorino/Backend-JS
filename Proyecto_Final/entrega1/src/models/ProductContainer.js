const fs = require('fs');

class ProductContainer {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    //Devuelve un array con los objetos presentes en el archivo.
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.pathFile, "utf-8");
            let info = JSON.parse(data);
            return info;
        } catch (error) {
            return []; //Si no hay productos, devuelve un array vacío
        }
    }

    //recibe un objeto, lo guarda en el archivo y devuelve el id asignado
    async save(producto){
        let data = await this.getAll();
        let id = 0; //Inicializo el id en 0
        //let dataObj = null;
        let dataObj = [];
        if (data.length == 0 ){
            id = 1;
        } else {
            dataObj = data;
            id = dataObj[dataObj.length - 1].id + 1; //Le paso el id del último objeto
        }
        const newObj = {id: id, ...producto}; //genero el nuevo objeto y le agrego el id correspondiente
        //push a dataObj
        dataObj.push(newObj);

        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify(dataObj, null, 2)); //el 2º parámetro :null para que no reemplace, y el 3º parámetro :2 para el espaciado
            return id;
        } catch (error) {
            console.log(error);
        } 
    }

    //Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id){
        try {
            let data = await this.getAll();
            let position = data.findIndex(x => x.id == id); //Me devuelve la posición del producto con el id
            let producto = null;

            if (position >= 0){
                //Lo encontró
                return producto = data[position];
            } else {
                //No lo encontró, findIndex devolvió -1
                return producto;
            }
        } catch (error) {
            throw new Error('Product ID not found');
        }
    }

    async updateById(id, product) {
        try {
            const products = await this.getAll()
            //verifico si existe ese id sino mando error
            const productToUpdate = products.find((product) => product.id === id)
            if (!productToUpdate) {
                throw new Error('Product ID not found')
            }
            //actualizo el producto
            const updatedProduct = { ...productToUpdate, ...product }
            //busco el indice del producto a actualizar
            const index = products.findIndex((product) => product.id === id)
            //actualizo el producto en el array
            products[index] = updatedProduct
            //guardo el array en el archivo
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            return updatedProduct
        } catch (error) {
            throw new Error('Product ID not found')
        }
    }

    //Elimina del archivo el objeto con el id buscado.
    async deleteById(id){
        let data = await this.getAll();
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

module.exports = {
    ProductContainer
}