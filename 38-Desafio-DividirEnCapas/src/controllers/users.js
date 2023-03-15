import { logger } from "../config/logger.js";

const renderLogin = async (req, res) => {
    const { method } = req;
    logger.info(`Access to route: /loggin/error with ${method} method`)
    return req.isAuthenticated()
        ? res.redirect('/')
        : res.render('login')
};

const renderFaillogin = async (req, res) => {
    const { method } = req;
    logger.info(`Access to route: /loggin/error with ${method} method`)
    res.render('faillogin', { process: 'Login'})
};

const renderLogout = async (req, res) => {
    const { method } = req;
    logger.info(`Access to route: /loggin/error with ${method} method`)
    const username = req.session.username;
    req.session.destroy( err => {
        return (!err)
            ? res.render('./logout', { user: username })
            : res.send({ status: 'logout error', body: err })
    })
};

const renderRegister = async (req, res) => {
    const { method } = req;
    logger.info(`Access to route: /loggin/error with ${method} method`)
    // res.render('register')
    return req.isAuthenticated()
        ? req.redirect('/')
        : res.render('register', { process: 'Register'})
};

const renderFailregister = async (req, res) => {
    const { method } = req;
    logger.info(`Access to route: /loggin/error with ${method} method`)
    res.render('failregister')

}

const loginUser = async (username, password, done) => {
    return await userService.loginUser(username, password, done)
};

const registerUser = async (username, password, done) => {
    return await usersService.registerUser(username, password, done)
};

const serializeUser = async (username, done) => {
    return usersService.serializeUser(username, done)
};

const deserializeUser = async (username, done) => {
    return usersService.deserializeUser(username, done)
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