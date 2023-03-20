import { messagesSchema } from "../models/schemaChat.js";
import { normalize } from "normalizr";

class DaoChat {
    constructor (model) {
        this.model = model
    }

    getChat = async () => {
        const data = await this.model.find({}, {_id:0, __v:0});
        return data;
    };

    addChat = async (data) => {
        const dataAdd = new this.model(data);
        const add = await dataAdd.save();
        return add;
    };

    getNormalized = async () => {
        let listaMensajes = await this.getChat()
        let strin = JSON.stringify(listaMensajes)
        let data = JSON.parse(strin)            
        //  Mensaje original
        let mensajes = {
            id: 'backendCoder09',
            messages: data
        };
        let messagesNorm = normalize(mensajes, messagesSchema);

        const lengthObjetoOriginal = JSON.stringify(mensajes).length;
        const lengthObjNormalizado = JSON.stringify(messagesNorm).length;
        
        return {
            normilized: messagesNorm,
            compression: Math.trunc((1 - (lengthObjetoOriginal/lengthObjNormalizado)) * 100)
        }
    };
}

export {
    DaoChat
};