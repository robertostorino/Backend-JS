import { messagesSchema } from "../models/schemaChat";

class chatContainerMongoose {
    constructor (model) {
        this.model = model
    }

    getChat = async () => {
        const data = await this.model.find({}, {_id:0, __v:0});
        return data;
    };

    addChat = async (data) => {
        const dataAdd = new this.model(data);
        (data.length === 0) 
            ?  this.save({...data, fyh: new Date().toLocaleString(), id: 1})
            :  this.save({...data, fyh: new Date().toLocaleString(), id: data.length +1})
        const add = await dataAdd.save();
        return add;
    };

    if (listaMensajes.length === 0) {
        return await chatController.insertMessage({...data, fyh: new Date().toLocaleString(), id: 1})

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
        // let messages = messagesNorm;

        const lengthObjetoOriginal = JSON.stringify(mensajes).length;
        const lengthObjNormalizado = JSON.stringify(messagesNorm).length;
        
        return {
            normilized: messagesNorm,
            compression: Math.trunc((1 - (lengthObjetoOriginal/lengthObjNormalizado)) * 100)
        }
    };
}

export {
    chatContainerMongoose
};