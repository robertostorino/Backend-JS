import { chatRepository } from "../persistence/repositories/chatRepository.js";

const persistence = new chatRepository();

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