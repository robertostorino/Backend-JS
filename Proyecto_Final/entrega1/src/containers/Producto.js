const fs=require('fs');


class Producto {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.id = 0;
    }

    createFile(){
        fs.writeFileSync(this.nombreArchivo, '');
    }

    checkIfFileExists(){
        if (!fs.existsSync(this.nombreArchivo)) {
            this.createFile();
        }
    }

    getProductos() {
        let array = fs.readFileSync(this.nombreArchivo, 'utf-8');
        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array); 
        }
    }

    getLastId(){ 
        let array = this.getProductos();
        if (array.length === 0) {
            return 0;
        }
        let lastId = array[array.length - 1].id;
        return lastId;
    }
    
    getProductoById(id) {

        let array = this.getProductos();
        let objeto = array.find(objeto => objeto.id === parseInt(id));

        if (objeto === undefined) {
            return {error : 'Product not found'};
        } 

        return objeto;
    }

    postProducto(objeto) {
        let array = this.getProductos();
        this.id = this.getLastId() + 1;
        objeto.id = this.id;
        objeto.timestamp = Date.now();
        array.push(objeto);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        return objeto;
    }


    putProducto(id, objeto) {

        let array = this.getProductos();

        try {

            let objetoActualizado = array.find(objeto => objeto.id === parseInt(id));

            if (objetoActualizado === undefined) {

                return {error: 'Product not found'};

            } else {

                let indice = array.indexOf(objetoActualizado);
                objeto.id = parseInt(id);
                objeto.timestamp = Date.now();
                array[indice] = objeto;
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
                return objeto;

            }
        }
        catch (error) {
            return {error: 'Could not update object with that ID'};
        }
    }

    deleteProducto(id) {
        let array = this.getProductos();
        let objeto = array.find(objeto => objeto.id === parseInt(id));

        if (objeto === undefined) {
            return {error: 'Could not delete object with that ID'};
        } else {

            let indice = array.indexOf(objeto);
            array.splice(indice, 1);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
            return objeto;
        }
    }
    
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '');
    }
}


module.exports = Producto;