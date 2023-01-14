import mongoose from 'mongoose';

const collectionChat = "chat"

const schemaChat = new mongoose.Schema({
    author:
        {
            mail: String,
            name: String,
            surname: String,
            age: Number,
            alias: String,
            avatar: String
        },
    text: String,
    fyh: String,
    id: Number
})

const modelsChat = mongoose.model(collectionChat, schemaChat)

export  {
    modelsChat
};