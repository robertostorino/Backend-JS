import mongoose from "mongoose";
import logger from "../src/config/logger.js";
import dotenv from 'dotenv';

dotenv.config();


// const connectDB = async () => {
//     mongoose.set("strictQuery", false);
//     mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// };

// export { connectDB }

class MongoConnection {
    constructor() {
        if (!MongoConnection.instance) {
            const url = process.env.MONGOOSE_URL;
            mongoose.set("strictQuery", false);
            mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            MongoConnection.instance = this;
        }
        return MongoConnection.instance;
    }

    async connect() {
        try {
            mongoose.connection.on('open', () => {
                logger.info('Connected to MongoDB Atlas')
            })
        } catch (error) {
            logger.error('Error connecting to MongoDB Atlas', error)
        }
    }
}

export { MongoConnection };