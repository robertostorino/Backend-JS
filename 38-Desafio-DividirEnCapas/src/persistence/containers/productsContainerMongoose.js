// // import mongoose from 'mongoose';
// import { modelsProducts } from "../../persistence/models/modelsProducts.js"; 
// // import { modelsChat } from "../../persistence/models/modelsChat.js";
// // import { modelsUsers } from '../../persistence/models/modelsUsers.js';
// // import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// // import { logger } from '../../config/logger.js';
// dotenv.config();


// // mongoose.set("strictQuery", false);
// // mongoose.connect(process.env.MONGOOSE_URL, {
// //                     useNewUrlParser: true,
// //                     useUnifiedTopology: true
// //                 }, (err) => {
// //                     if (err) {
// //                         logger.error(err);
// //                     } else {
// //                         logger.info('MongoDB Connected')
// //                     }
// //                 });


class containerProducts {
    constructor(model) {
        this.model = model
    }
    

    add = async (data) => {
        const dataAdd = new this.model(data);
        const add = await dataAdd.save();
        return add;
    };

    get = async (id) => {
        if (id) {
            const data = await this.model.findById(id);
            return data;
        }
        else{
            const data = await this.model.find();
            return data;
        }
    };

    update = async (id, data) => {
        const update = await this.model.updateOne({_id: id}, data);
        return update;
    };
    
    delete = async (id) => {
        const deelete = await this.model.deleteOne({_id : id});
        return deelete;
    };
    
}

export {
    containerProducts
};