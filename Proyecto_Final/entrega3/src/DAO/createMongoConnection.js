import mongoose from "mongoose";
import { config } from "../constants/config.js";
import * as dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
};

export { connectDB }
