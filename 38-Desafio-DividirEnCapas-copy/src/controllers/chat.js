import services from "../services/chat.js"

const toSocketMessages = async () => {
    return await services.getNormalized()
};

const insertMessage = async (msg) => {
    await services.insertMessage(msg)
};

export default {
    toSocketMessages,
    insertMessage
};