// import mongoose from 'mongoose';
// import { modelsProducts } from "../../persistence/models/modelsProducts.js"; 
// import { modelsChat } from "../../persistence/models/modelsChat.js";
// import { modelsUsers } from '../../persistence/models/modelsUsers.js';
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


class chatContainerMongoose {
    constructor (model) {
        this.model = model
    }

    getChat = async () => {
        const data = await this.model.find({}, {_id:0, __v:0});
        return data;
    };

    addChat = async (data) => {
        const dataAdd = new this.model(data);
        const add = await dataAdd.save();
        return add;
    };
}

export {
    chatContainerMongoose
};