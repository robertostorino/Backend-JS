import { DaoChat } from "../persistence/Daos/chatDaoMongoose.js";
import { modelsChat } from "../persistence/models/modelsChat.js";

const persistence = new DaoChat(modelsChat);

const getNormalized = async () => {
    return await persistence.getNormalized()
};

const insertMessage = async (msg) => {
    return await persistence.addChat(msg)
};

const getChat = async () => {
    return await persistence.getChat()
}

export default {
    getNormalized,
    insertMessage,
    getChat
};