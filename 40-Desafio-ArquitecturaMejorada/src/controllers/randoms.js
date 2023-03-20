// import service from '../services/randoms.js';
import { fork } from 'child_process';
import path from 'path';
import { logger } from '../config/logger.js';


async function randoms (req, res) {
    const { url, method } = req;
    logger.info(`Access to route: ${url} with ${method} method`)
    
    //cant recibe el numero por query y lo convierte a tipo Number
    // Si no recibe valor, entonces por defecto es 100000000
    const cant = req.query.cant ? Number(req.query.cant) : 100000000;
    const forked = fork(path.resolve(process.cwd(), "./src/process/getNumbersCount.js"));
    forked.on("message", (numbers) => res.json(numbers));
    forked.send({ cant });
    // const result = service.aleatorio(cant);
}

export default {
    randoms
}
