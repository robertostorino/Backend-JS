import * as dotenv from 'dotenv';
import { MongoConnection } from './src/config/connectMongo.js';
import { startServer } from './app.js';
import { executeServerCluster } from './src/utils/excetuteClusterMode.js';
import { logger } from './src/config/logger.js';
import { config } from './src/constants/config.js';

dotenv.config();

const port  = process.env.PORT || 8080;

// connectDB();
const mongoConnection = new MongoConnection();
mongoConnection.connect();

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

process.on('beforeExit', () => mongoConnection.disconnect());