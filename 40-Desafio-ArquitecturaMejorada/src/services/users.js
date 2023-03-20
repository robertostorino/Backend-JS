// import { containerMongoose } from "../containers/containerMongoose.js";
import { DaoUsers } from "../persistence/Daos/usersDaoMongoose.js";
import { modelsUsers } from "../persistence/models/modelsUsers.js";

const persistence = new DaoUsers(modelsUsers);

const loginUser = async (username, password, done) => {
    return await persistence.loginUser(username, password, done)
};

const registerUser = async (username, password, done) => {
    return await persistence.registerUser(username, password, done)
};

const serializeUser = (username, done) => {
    return persistence.serializeUser(username, done)
};

const deserializeUser = async (user, done) => {
    return persistence.deserializeUser(user, done)
};

const getUser = (user) => {
    return persistence.getUser(user)
};

export default {
    loginUser,
    registerUser,
    serializeUser,
    deserializeUser,
    getUser
}