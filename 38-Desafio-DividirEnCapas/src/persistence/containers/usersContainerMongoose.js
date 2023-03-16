import mongoose from 'mongoose';
import { modelsProducts } from "../models/modelsProducts.js"; 
import { modelsChat } from "../models/modelsChat.js";
import { modelsUsers } from '../models/modelsUsers.js';
// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { logger } from '../../config/logger.js';
dotenv.config();


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOOSE_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err) => {
                    if (err) {
                        logger.error(err);
                    } else {
                        logger.info('MongoDB Connected')
                    }
                });


class containerUsers {
    constructor(model) {
        this.model = model
    }

    async getUser(username){
        try {
            let user = await modelsUsers.findOne({ username: username }, {_id:0, __v:0});
            return user;
        } catch (error) {
            return null;
        }
    };

    async loginUser(username, password, done){
        try {
            let user = await this.getUser(username)
            if (!user) {
                return done(null, false, console.log('Usuario o contraseña incorrectos'));
            } else {
                if (this.passwordOk(password, user)) {
                    return done(null, user)
                } else {
                    return done(null, false, { mensaje: 'Usuario o contraseña incorrectos'})
                }
            }
        } catch (error) {
            return done(error)
        }
    };

    async createUser(user){
        try{
            await modelsUsers.create(user);
            logger.info('user created');
        } catch(err) {
            logger.error(err)
        };
        
    };
}

export {
    containerUsers
};