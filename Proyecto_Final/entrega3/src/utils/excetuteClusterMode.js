import { startServer } from "../../app.js";
import cluster from 'cluster';
import { logger } from "./logger.js";
import os from 'os'

export function executeServerCluster(port) {
    if (cluster.isPrimary) {
        const cpus = os.cpus().length;

        // Forking to workers
        for (let i = 0; i < cpus; i++) cluster.fork();

        cluster.on("exit", (worker) => {
            logger.warn(`Worker ${worker.process.pid} died`);
            cluster.fork();
        });

        cluster.on("listening", (worker) => {
            logger.info(`New Worker ${worker.process.pid} is alive and listening`)
        });
    } else {
        startServer(port)
    }
}