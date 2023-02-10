import dotenv from 'dotenv';
import { connectDB } from './utils/connectDB.js';
import { port, mode } from './minimist.config.js';
import { startServer } from './app.js';

dotenv.config();

connectDB();

switch (mode.toLowerCase()) {
    case "cluster":
        executeServerCluster(port)
        break;

    default:
        console.log("Executing app in fork mode\n");
        startServer(port);
        break;
};