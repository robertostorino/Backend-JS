import { logger } from "../../config/logger.js";

export function logRequest(ctx, next){
    // Makes log
    req.logError = function (err) {
        logger.error(`Something goes wrong: ${err}`)
    };
    const { url, method } = ctx.request;
    logger.info(`The requested route: ${url} with ${method} method`);
    // logger.info(`The requested route is ${req.url} with ${req.method} method`);
    next();
};

export function logNotImplementedRequest(ctx, next){
    const { url, method } = ctx.request;
    logger.warn(`Requested route: ${url} with ${method} method is not implemented`);
    // logger.warn(`Requested route ${req.url} with ${req.method} method is not implemented`);
    next();
};