import bcrypt from 'bcrypt';
import { model } from 'mongoose';
import { logger } from '../config/logger.js';

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};

class UsersContainer {
    constructor(url) {
        this.url = url;
    }

    async getUser(username) {
        let data = null;
        try {
            data = await model.UserModel.find({ username: username });
            return data[0];
        } catch (error) {
            console.log(error);
            return (data = null);
        }
    };

    async authHash(username, password) {
		try {
			let data = await this.getUser(username);
			let auth = await bcrypt.compare(password, data.password);
			return auth;
		} catch (error) {
			console.log(error);
		}
	};
    
    async insertUser(data) {
		try {
			const user = { username: data.username, password: createHash(data.password), nombre: data.nombre, direccion: data.direccion, edad: data.edad, telefono: data.telefono, imagen: data.imagen, cartId: data.cartId };
			await model.usermodel.insertMany(user);
			let newUser = data;
			return newUser;
		} catch (error) {
			logger.error(error);
		}
	};
};

export { UsersContainer };