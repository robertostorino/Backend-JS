import services from "../services/users.js";
import { logger } from "../config/logger.js";

async function auth (ctx){
    const { url, method } = ctx.request;
    logger.info(`Access to route: ${url} with ${method} method`);
    const usuario = ctx.state.user.username
    // const usuario = req.session.passport.user.username
    const username = await services.getUser(usuario)
    await ctx.render('index', { user: username.username })
    // res.render('index', { user: username.username })
};

export default { auth }