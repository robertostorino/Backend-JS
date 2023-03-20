import { chatContainerMongoose } from "../persistence/containers/chatContainerMongoose.js";
import { modelsChat } from "../persistence/models/modelsChat.js";

const persistence = new chatContainerMongoose(modelsChat);

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