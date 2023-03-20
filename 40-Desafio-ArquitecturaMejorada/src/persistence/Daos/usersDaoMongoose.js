import bcrypt from 'bcrypt';
import { transformToDto } from '../dtos/userDto.js';

class DaoUsers {
    constructor(model) {
        this.model = model
    }

    getUser = async (username) => {
        try {
            let user = await this.model.findOne({ username: username }, { _id: 0, __v: 0 });
            return transformToDto(user)

        } catch (error) {
            return null
        }
    }

    loginUser = async (username, password, done) => {
        try {
            let user = await this.getUser(username)
            if (!user) {
                return done(null, false, console.log('Usuario o contraseña incorrectos'));
            } else {
                if (this.#passwordOk(password, user)) {
                    return done(null, transformToDto(user))
                } else {
                    return done(null, false, { mensaje: 'Usuario o contraseña incorrectos' });
                }
            }

        } catch (error) {
            return done(error);
        }
    }


    registerUser = async (username, password, done) => {
        try {
            let user = await this.getUser(username);
            if (user) {
                return done(null, false, console.log(user.username, 'Usuario ya existe'));
            } else {
                let nuevoUsuario = new this.model({
                    username,
                    password: this.#createHash(password)
                })
                nuevoUsuario.save();
                return done(null, transformToDto(nuevoUsuario))
            }

        } catch (error) {
            return done(error);
        }
    }

    serializeUser = (username, done) => {
        try {
            return done(null, transformToDto(username));
        } catch (error) {
            return done(error);
        }
    }

    deserializeUser = async (user, done) => {
        let username;
        user.length == undefined ? username = user.username : username = user[0].username;
        try {
            const user = await this.model.find({ username: username })
            return user ? done(null, transformToDto(user)) : done(null, false);
        } catch (error) {
            return done(error);
        }
    }

    #passwordOk = (password, user) => {
        return bcrypt.compareSync(password, user.password);
    }

    #createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

}

export {
    DaoUsers
};