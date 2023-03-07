import mongoose from 'mongoose'

const usersCollection = 'users';
const userSchema = new mongoose.Schema({
	username: {type: String, require: true},
	password: {type: String, require: true},
	nombre: {type: String, require: true},
	direccion: { type: String, require: true },
	edad: { type: Number, require: true },
	imagen: { type: String, require: true },
	cartId: { type: String, require: true },
});

export const usermodel = mongoose.model(usersCollection, userSchema);