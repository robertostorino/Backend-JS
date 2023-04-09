import { sysInfo } from "../process/sysInfo.js";
import { logger } from "../config/logger.js";

async function info (ctx) {
    const { url, method } = ctx.request;
    logger.info(`Access to route: ${url} with ${method} method`);
    await ctx.render('info', {info: sysInfo()})
    // res.render('info', {info: sysInfo()})
}

export default {
    info
}