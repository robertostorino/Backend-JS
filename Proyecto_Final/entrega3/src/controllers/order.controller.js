import { Error } from '../constants/config.js';
import { mongoProduct } from "../models/Mongo/Mongo.models.js";
import { mongoCart } from "../models/Mongo/Mongo.models.js";
import { MongoProduct } from "../models/Mongo/Product/product.database.js";
import { MongoCart } from "../models/Mongo/Cart/cart.database.js";
import { getUser } from '../models/Mongo/session/session.model.js';

const products = new MongoProduct(mongoProduct);
const carts = new MongoCart(mongoCart, products);

export async function postOrder(req, res) {
    const user = await getUser(req.session.passport.user);
    const cart = await cartContainer.getById(user.cartId);

    const buyedProducts = cart[0].productos.map(producto => {
        return `${producto.nombre} - ${producto.precio}`
    }).join("<br>")

    const html = `<h1>Nuevo Pedido</h1>
    ${buyedProducts}`;

    await sendEmailOrder(html, user[0].nombre, user[0].email);

    //SEND WHATSAPP
    const waMessage = {
        body: 'Su pedido ha sido recibido y se encuentra en proceso',
        from: "whatsapp:" + process.env.TWILIO_REG_PHONE_WHATSAPP,
        to: "whatsapp:" + process.env.ADMIN_NUMBER_WHATSAPP
    }

    await sendOrder(waMessage);

    // SEND SMS
    const smsMessage = {
        body: 'Su pedido ha sido recibido y se encuentra en proceso',
        from: process.env.TWILIO_REG_PHONE_SMS,
        to: process.env.ADMIN_NUMBER_SMS
    }

    await sendOrder(smsMessage);

    // RESPONSE
    res.json({
        status: "pedido enviado"
    })

}