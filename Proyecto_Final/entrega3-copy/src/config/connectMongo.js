import mongoose from "mongoose";
import { logger } from "./logger.js";
import dotenv from 'dotenv';

dotenv.config();

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

    async disconnect() {
        logger.info('Disconnecting MongoDB Atlas')
        mongoose.connection.close()
    }
}

export { MongoConnection };