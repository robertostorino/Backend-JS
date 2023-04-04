import dotenv from 'dotenv';
import { MongoConnection } from './utils/connectMongo.js';
import { port, mode } from './minimist.config.js';
import { startServer } from './app.js';
import { clusterUp } from './src/process/cluster_up.js';
import { logger } from './src/config/logger.js';

dotenv.config();

const mongoConnection = new MongoConnection();
mongoConnection.connect();

switch (mode.toLowerCase()) {
    case "cluster":
        clusterUp(port)
        break;

    default:
        logger.info("Executing app in fork mode\n");
        startServer(port);
        break;
};

process.on('beforeExit', () => mongoConnection.disconnect());