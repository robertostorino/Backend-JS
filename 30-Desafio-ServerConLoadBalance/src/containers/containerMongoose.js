import mongoose from 'mongoose';
import { modelsProducts } from "../models/modelsProducts.js"; 
import { modelsChat } from "../models/modelsChat.js";
import { modelsUsers } from '../models/modelsUsers.js';
// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOOSE_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('MongoDB Connected')
                    }
                });


class containerMongoose {
    
      //-----------------------------------------//
     //     PRODUCTS                            //
    //-----------------------------------------//

    async add(data){
        const dataAdd = new modelsProducts(data);
        const add = await dataAdd.save();
        return add;
    };

    async get(id){
        if (id) {
            const data = await modelsProducts.findById(id);
            return data;
        }
        else{
            const data = await modelsProducts.find();
            return data;
        }
    };

    async update(id, data){
        const update = await modelsProducts.updateOne({_id: id}, data);
        return update;
    };
    
    async delete(id){
        const deelete = await modelsProducts.deleteOne({_id : id});
        return deelete;
    };
    
      //-----------------------------------------//
     //     CHAT                                //
    //-----------------------------------------//

    async getChat(){
        const data = await modelsChat.find({}, {_id:0, __v:0});
        return data;
    };

    async addChat(data){
        const dataAdd = new modelsChat(data);
        const add = await dataAdd.save();
        return add;
    };

      //-----------------------------------------//
     //     USERS                               //
    //-----------------------------------------//

    async getUser(username){
        try {
            let user = await modelsUsers.findOne({ username: username }, {_id:0, __v:0});
            return user;
        } catch (error) {
            return null;
        }
    };

    // //  Using bcrypt, verify password
    // passwordOk(password, user) {
    //     return bcrypt.compareSync(password, user.password);
    // };

    // //  Using bcrypt, encrypt password
    // createHash(password) {
    //     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // };

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
            console.log('user created');
        } catch(err) {
            console.log(err)
        };
        
    };

    // serializeUser(username, done) {
    //     try {
    //         return done(null, username);
    //     } catch (error) {
    //         return done(error);
    //     }
    // }
    
    // async deserializeUser(user, done) {
    //     let username;
    //     user.length == undefined ? username = user.username : username = user[0].username;
    //     try {
    //         const user = await usuario.find({ username: username })
    //         return user ? done(null, user) : done(null, false);
    //     } catch (error) {
    //         return done(error);
    //     }
    // }
}

export {
    containerMongoose
};