import { ChatDAOFactory } from "../Factories/chatDAOFactory.js";

const factory = new ChatDAOFactory();

export class chatRepository {
    DAO

    constructor() {
        this.DAO = factory.getDao()
    }

    getChat = async() => {
        return await this.DAO.getChat()
    }

    addChat = async(data) => {
        return await this.DAO.addChat(data)
    }

    getNormalized = async() => {
        return await this.DAO.getNormalized()
    }
}