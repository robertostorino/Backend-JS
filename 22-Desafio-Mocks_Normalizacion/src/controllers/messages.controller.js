import { ClienteSQL } from "../models/database.model.js";
import { options } from "../options/sqlite3.conn.js";

const bd = new ClienteSQL(options, 'messages'); //Inicializo la base de datos pasandole la conexión y el nombre de la tabla.

bd.createTable(); //Creo la base de datos

async function toSocketMessages(){
    return await bd.getAll();
}

async function insertMessage(message){   
    await bd.save(message);
}


export {
    toSocketMessages,
    insertMessage
};