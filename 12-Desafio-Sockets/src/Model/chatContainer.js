const { response } = require('express');
const fs = require('fs');
const path = require('path');

const pathFile = 'chat.txt';

class ChatContainer {
    constructor (pathFile) {
        this.pathFile = path.join(__dirname,"..", `data/${pathFile}`);
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
    async save(message){
        
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

        const newObj = {id: id, ...message}; //genero el nuevo objeto y le agrego el id correspondiente

        //push a dataObj
        dataObj.push(newObj);

        //try
        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify(dataObj, null, 2)); //el 2º parámetro :null para que no reemplace, y el 3º parámetro :2 para el espaciado
            response.error = 0,
            response.message = `The message has been saved with id: ${id}`;
            return id;
        } catch (error) {
            throw new Error(error);
        } 
        //catch

    }
}

module.exports = ChatContainer;