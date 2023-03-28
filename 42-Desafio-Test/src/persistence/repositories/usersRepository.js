import { UsersDAOFactory } from "../Factories/usersDAOFactory.js";

const factory = new UsersDAOFactory()

export class userRepo {
    DAO

    constructor() {
        this.DAO = factory.getDao()
    }

    getUser = async (username) => {
        return await this.DAO.getUser(username)
    }

    loginUser = async (username, password, done) => {
        return await this.DAO.loginUser(username, password, done);
    }

    signupUser = async (username, password, done) => {
        return await this.DAO.signupUser(username, password, done);
    }

    serializeUser = (username, done) => {
        return this.DAO.serializeUser(username, done);
    }

    deserializeUser = async (user, done) => {
        return await this.DAO.deserializeUser(user, done)
    }
}