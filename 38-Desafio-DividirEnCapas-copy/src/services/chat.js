import { chatContainerMongoose } from "../persistence/containers/chatContainerMongoose";
import { modelsChat } from "../persistence/models/modelsChat";

const persistence = new chatContainerMongoose(modelsChat);

const getNormalized = async () => {
    return await persistence.getNormalized()
};

const insertMessage = async (msg) => {
    return await persistence.addChat(msg)
};

export default {
    getNormalized,
    insertMessage
};