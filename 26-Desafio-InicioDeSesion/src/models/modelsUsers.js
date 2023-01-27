import mongoose from 'mongoose';

const collectionUsuarios = "users"

const schemaUsuarios = new mongoose.Schema({
    username: String,
    password: String,
    email: String
})

const modelsUsers = mongoose.model(collectionUsuarios, schemaUsuarios);

export {
    modelsUsers
};