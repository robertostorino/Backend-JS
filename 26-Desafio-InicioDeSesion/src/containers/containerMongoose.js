import mongoose from 'mongoose';
import { modelsProducts } from "../models/modelsProducts.js"; 
import { modelsChat } from "../models/modelsChat.js";
import { modelsUsers } from '../models/modelsUsers.js';
import { config } from "../constants/config.js"

const URL = "mongodb+srv://coderhouse:coderhouse@miprimercluster.jrovqqz.mongodb.net/ecommerce?retryWrites=true&w=majority"
// const URL = config.mongooseURL;

mongoose.set("strictQuery", false);
mongoose.connect(URL, {
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

    async getUser(){
        const data = await modelsUsers.find({}, {_id:0, __v:0});
        return data;
    };

    async addUser(){
        const dataAdd = new modelsUsers(data);
        const add = await dataAdd.save();
        return add;
    };
}

export {
    containerMongoose
};