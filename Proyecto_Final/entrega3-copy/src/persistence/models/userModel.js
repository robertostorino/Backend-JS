import mongoose from "mongoose";

const usuariosCollection = "user";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, require: true },
    telephone:{ type: String, require: true },
    avatar:{ type: String, required: true },
    cartId: {type: Number, required: true}
},
{ versionKey: false },
);

const modelUser = mongoose.model(usuariosCollection, userSchema);

export {
    modelUser
}