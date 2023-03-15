import { containerMongoose } from "../containers/containerMongoose.js";
import { modelsUsers } from "../persistence/models/modelsUsers.js";

const persistence = new containerMongoose(modelsUsers);

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

export default {
    loginUser,
    registerUser,
    serializeUser,
    deserializeUser
}