import { fork } from 'child_process';
import path from 'path';
import { logger } from '../config/logger.js';


const randoms = async (ctx) => {
    // const { url, method } = req;
    const { url, method } = ctx.request;
    logger.info(`Access to route: ${url} with ${method} method`)
    
        //cant recibe el numero por query y lo convierte a tipo Number
        // Si no recibe valor, entonces por defecto es 100000000
    const cant = ctx.query.cant ? Number(ctx.query.cant) : 100000000;
    // const cant = req.query.cant ? Number(req.query.cant) : 100000000;
    const child = fork(path.resolve(process.cwd(), "./src/process/getNumbersCount.js"));
    child.on("message", (numbers) => {
        ctx.body = JSON.stringify(numbers);
    });
    // child.on("message", (numbers) => res.json(numbers));
    child.send({ cant });
        // const result = service.aleatorio(cant);
}

export default {
    randoms
}
