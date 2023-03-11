import * as dotenv from 'dotenv';
import { connectDB } from './src/DAO/createMongoConnection.js';
import { startServer } from './app.js';
import { executeServerCluster } from './src/utils/excetuteClusterMode.js';
import { logger } from './src/utils/logger.js';
import { config } from './src/constants/config.js';

dotenv.config();

const port  = process.env.PORT || 8080;

connectDB();

switch (config.executionMode) {
    case "cluster":
        logger.info("Executing app in cluster mode");
        executeServerCluster(port)
        break;

    default:
        logger.info("Executing app in fork mode");
        startServer(port);
        break;
}