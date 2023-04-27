import UsersService from "../services/users.js";
import { logger } from "../config/logger.js";

const services = new UsersService();

export default class UsersController {
    constructor() {
        this.services = services
    };

    destroyCredentials = (req, res) => {
        const { url, method } = req
        logger.info(`Access to route: ${url} method: ${method}`)
        if (!req.isAuthenticated()) {
            return res.redirect('/')
        }
        const username = req.user[0].name;
        req.session.destroy((err) => {
            if (err) console.error(err);
            else
                return res
                    .clearCookie("connect.sid")
                    .render("disconnect_user", { user: username, script: 'redirect' });
        });
    };

    renderSignUp = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /signup method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render("signup",{ script: 'signup' });
    };

    renderFailLogin = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /login/error method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render('error', { process: 'LOGIN' })
    };

    renderFailSignUp = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /signup/error method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render('error', { process: 'SIGNUP' })
    };

    renderLogin = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /login method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render("login");
    };

    savePicturesLocal = async (req, res, next) => {
        try {
            let ext = req.files.avatar.mimetype.split('/')[1];
            let avatar = req.files.avatar;
            avatar.mv(`./public/avatars/${req.body.username}.${ext}`);
        } catch (error) {
            logger.error(error)
        }
        next();
    };

    renderProfile = (req, res) => {
        const userReq = req.user[0];
        const userInfo = {
            username: userReq.username,
            name: userReq.name,
            address: userReq.address,
            age: userReq.age,
            telephone: userReq.telephone,
            avatar: userReq.avatar
        }
        const { url, method } = req
        logger.info(`User ${userReq.username} has logged in, route: ${url} method: ${method}`)
        res.render('profile', {  navBar: true, userInfo , user: userReq.name, script: 'main'})
    };

    // Sessions

    loginUser = async (username, password, done) => {
        return this.services.loginUser(username, password, done)
    };
    
    signUpUser = async (req, username, password, done) => {
        return this.services.signUpUser(req, username, password, done)
    };

    serializeUser = (username, done) => {
        return this.services.serializeUser(username, done)
    };

    deserializeUser = async (user, done) => {
        return this.services.deserializeUser(user, done)
    };

    /////  DEPURAR

    // renderRoot = async (req, res) => {
    //     let products = await productsModel.getAllProducts();
    //     let exist = products.length > 0
    //     const user = req.user[0].name;
    //     const cartId = req.user[0].cartId;
    //     // const hostName = getHostName(req);
    //     const { url, method } = req
    //     logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
    //     res.render('index', { script: 'main', user, cartId, products, hostName, listExists: exist, navBar: true })
    // };

    

    // renderCart = async (req, res) => {
    //     const cartId = req.user[0].cartId;
    //     let cart = await cartsModel.getCart(cartId);
    //     let cartProducts = cart[0].products;
    //     let totalOrder = cartProducts.reduce((acc, objeto) => acc + objeto.total_price, 0);
    //     const user = req.user[0].name;
    //     const hostName = getHostName(req);
    //     const { url, method } = req
    //     logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
    //     res.render('cart_detail', { script: 'cart', user, cartId, products: cartProducts, hostName, listExists: cartProducts.length > 0, totalOrder, navBar: true })
    // };
};

// function destroyCredentials(req, res) {
//     const { url, method } = req
//     logger.info(`Access to route: ${url} method: ${method}`)
//     if (!req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     const username = req.user[0].name;
//     req.session.destroy((err) => {
//         if (err) console.error(err);
//         else
//             return res
//                 .clearCookie("connect.sid")
//                 .render("disconnect_user", { user: username, script: 'redirect' });
//     });
// }

// function renderSignUp(req, res) {
//     const { method } = req
//     logger.info(`Access to route: /signup method: ${method}`)
//     return req.isAuthenticated()
//         ? res.redirect("/")
//         : res.render("signup",{ script: 'signup' });
// }

// function renderFailLogin(req, res) {
//     const { method } = req
//     logger.info(`Access to route: /login/error method: ${method}`)
//     return req.isAuthenticated()
//         ? res.redirect("/")
//         : res.render('error', { process: 'LOGIN' })
// }

// function renderFailSignUp(req, res) {
//     const { method } = req
//     logger.info(`Access to route: /signup/error method: ${method}`)
//     return req.isAuthenticated()
//         ? res.redirect("/")
//         : res.render('error', { process: 'SIGNUP' })
// }

// function renderLogin(req, res) {
//     const { method } = req
//     logger.info(`Access to route: /login method: ${method}`)
//     return req.isAuthenticated()
//         ? res.redirect("/")
//         : res.render("login");
// }

// async function savePicturesLocal (req, res, next) {
//     try {
//         let ext = req.files.avatar.mimetype.split('/')[1];
// 		let avatar = req.files.avatar;
// 		avatar.mv(`./public/avatars/${req.body.username}.${ext}`);
// 	} catch (error) {
// 		logger.error(error)
// 	}
// 	next();
// };


// export {
//     destroyCredentials,
//     renderFailLogin,
//     renderLogin,
//     renderFailSignUp,
//     renderSignUp,
//     savePicturesLocal
// };

