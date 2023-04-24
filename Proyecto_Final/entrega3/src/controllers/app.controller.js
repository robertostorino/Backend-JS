import { logger } from "../utils/logger.js";
import { getHostName } from "../utils/miscelanius.js";
import { mongoProduct } from "../models/Mongo/Mongo.models.js";
import { mongoCart } from "../models/Mongo/Mongo.models.js";
import { MongoProduct } from "../models/Mongo/Product/product.database.js";
import { MongoCart } from "../models/Mongo/Cart/cart.database.js";

import { adminNewOrderNotificationMail, userOrderNotificationSMS, userOrderNotificationWhatsapp } from "../utils/notifications.js";

const productsModel = new MongoProduct(mongoProduct);
const cartsModel = new MongoCart(mongoCart, productsModel);


async function renderRoot(req, res) {
    let products = await productsModel.getAllProducts();
    let exist = products.length > 0
    const user = req.user[0].name;
    const cartId = req.user[0].cartId;
    const hostName = getHostName(req);
    const { url, method } = req
    logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
    res.render('index', { script: 'main', user, cartId, products, hostName, listExists: exist, navBar: true })
}

function renderProfile(req, res) {
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
}

async function renderCart(req, res) {
    const cartId = req.user[0].cartId;
    let cart = await cartsModel.getCart(cartId);
    let cartProducts = cart[0].products;
    let totalOrder = cartProducts.reduce((acc, objeto) => acc + objeto.total_price, 0);
    const user = req.user[0].name;
    const hostName = getHostName(req);
    const { url, method } = req
    logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
    res.render('cart_detail', { script: 'cart', user, cartId, products: cartProducts, hostName, listExists: cartProducts.length > 0, totalOrder, navBar: true })
}

//
import { getUser } from '../models/Mongo/session/session.model.js';

import * as dotenv from 'dotenv'
dotenv.config();

const products = new MongoProduct(mongoProduct);
const carts = new MongoCart(mongoCart, products);

//

async function notifyOrder (req, res) {
    const cartId = req.user[0].cartId;
	let cart = await cartsModel.getCart(cartId);
    const user = await getUser(req.session.passport.user.username);
    let userOrder = cart[0].products
    let userTelephone = user.telephone

    adminNewOrderNotificationMail(user, userOrder);
    userOrderNotificationSMS(userTelephone);
    userOrderNotificationWhatsapp(userTelephone);

    cartsModel.clearCart(cartId);
    let cartProducts = cart[0].products;
	const newOrder = JSON.stringify(cartProducts);
    res.json({error: 0, message: 'Order Created'})
}

export {
    renderRoot,
    renderProfile,
    renderCart,
    notifyOrder
}