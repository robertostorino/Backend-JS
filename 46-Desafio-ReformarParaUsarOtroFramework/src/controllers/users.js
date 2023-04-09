import { logger } from "../config/logger.js";
import users from "../services/users.js";

const renderLogin = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Access to route ${url} with ${method} method`);
    if (ctx.isAuthenticated()) {
        ctx.redirect('/');
    } else {
        await ctx.render('login')
    }
    // const { url, method } = req;
    // logger.info(`Access to route ${url} with ${method} method`);
    // return req.isAuthenticated()
    //     ? res.redirect('/')
    //     : res.render('login')
};

const renderFaillogin = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Access to route: ${url} with ${method} method`);
    await ctx.render('faillogin', { process: 'Login'}); 
    // const { url, method } = req;
    // logger.info(`Access to route: ${url} with ${method} method`)
    // res.render('faillogin', { process: 'Login'})
};

const renderLogout = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Access to route: ${url} with ${method} method`);
    const username = ctx.state.username;
    console.log(ctx.state.session.username);
    ctx.session = null;
    await ctx.render('./logout', { user: username })

    // const { url, method } = req;
    // logger.info(`Access to route: ${url} with ${method} method`)
    // const username = req.session.username;
    // req.session.destroy( err => {
    //     return (!err)
    //         ? res.render('./logout', { user: username })
    //         : res.send({ status: 'logout error', body: err })
    // })
};

const renderRegister = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Access to route: ${url} with ${method} method`)
    if (ctx.isAuthenticated()) {
        ctx.redirect('/')
    } else {
        await ctx.render('register', { process: 'Register'})
    }
    // const { url, method } = req;
    // logger.info(`Access to route: ${url} with ${method} method`)
    // return req.isAuthenticated()
    //     ? req.redirect('/')
    //     : res.render('register', { process: 'Register'})
};

const renderFailregister = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Access to route: ${url} with ${method} method`);
    await ctx.render('failregister');
    // const { url, method } = req;
    // logger.info(`Access to route: ${url} with ${method} method`)
    // res.render('failregister')
}

const loginUser = async (username, password, done) => {
    return await users.loginUser(username, password, done)
};

const registerUser = async (username, password, done) => {
    return await users.registerUser(username, password, done)
};

const serializeUser = async (username, done) => {
    return users.serializeUser(username, done)
};

const deserializeUser = async (username, done) => {
    return users.deserializeUser(username, done)
};

export default { 
    renderLogin, 
    renderFaillogin, 
    renderLogout,
    renderRegister,
    renderFailregister,
    loginUser,
    registerUser,
    serializeUser,
    deserializeUser 
};