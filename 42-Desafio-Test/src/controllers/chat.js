import services from "../services/chat.js"

const toSocketMessages = async () => {
    return await services.getNormalized()
};

const insertMessage = async (msg) => {
    await services.insertMessage(msg)
};

const getAllChat = async () => {
    return await services.getChat()
}

export default {
    toSocketMessages,
    insertMessage,
    getAllChat
};