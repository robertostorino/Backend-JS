import { Error } from '../constants/config.js';
// import { modelProducts } from '../persistence/models/productModel.js';
// import { modelCarts } from '../persistence/models/cartModel.js';
// import { DaoProduct } from '../persistence/DAOs/productDaoMongoose.js';
// import { DaoCart } from '../persistence/DAOs/cartDaoMongoose.js';
// import { DaoUser } from '../persistence/DAOs/userDaoMongoose.js';
// import { getUser } from '../persistence/DAOs/session.js';

// const products = new DaoProduct(modelProducts);
// const carts = new DaoCart(modelCarts, products);

/////////////////////
import UsersService from '../services/users.js';
import CartsService from '../services/carts.js';
import { adminNewOrderNotificationMail, userOrderNotificationSMS, userOrderNotificationWhatsapp } from '../utils/notifications.js';

const serviceUser = new UsersService();
const serviceCart = new CartsService()

export const notifyOrder = async (req, res) => {
    const cartId = req.user[0].cartId;
    let cart = await serviceCart.getCart(cartId);
    // let cart = await cartsModel.getCart(cartId);
    const user = await serviceUser.getUser(req.session.passport.user.username);
    // const user = await getUser(req.session.passport.user.username);
    let userOrder = cart[0].products
    let userTelephone = user.telephone

    adminNewOrderNotificationMail(user, userOrder);
    userOrderNotificationSMS(userTelephone);
    userOrderNotificationWhatsapp(userTelephone);

    serviceCart.clearCart(cartId);
    let cartProducts = cart[0].products;
    const newOrder = JSON.stringify(cartProducts);
    res.json({error: 0, message: 'Order Created'})
} 



/////////////////

// export async function postOrder(req, res) {
//     const user = await DaoUser.getUser(req.session.passport.user);
//     // const user = await getUser(req.session.passport.user);
//     const cart = await cartContainer.getById(user.cartId);

//     const twilioRegPhoneWhatsapp = process.env.TWILIO_REG_PHONE_WHATSAPP;
//     const twilioRegPhoneSms = process.env.TWILIO_REG_PHONE_SMS;

//     console.log("HOLAAAAAAAAAAAAAAAA")
//     console.log(`twilio whatsapp: ${twilioRegPhoneWhatsapp}`);
//     console.log(`twilio SMS: ${twilioRegPhoneSms}`)

//     const buyedProducts = cart[0].productos.map(producto => {
//         return `${producto.nombre} - ${producto.precio}`
//     }).join("<br>")

//     const html = `<h1>Nuevo Pedido</h1>
//     ${buyedProducts}`;

//     await sendEmailOrder(html, user[0].nombre, user[0].email);

//     //SEND WHATSAPP
//     const waMessage = {
//         body: 'Su pedido ha sido recibido y se encuentra en proceso',
//         from: "whatsapp:" + twilioRegPhoneWhatsapp,
//         to: 'whatsapp:+5492216334092'
//     }

//     await sendOrder(waMessage);

//     // SEND SMS
//     const smsMessage = {
//         body: 'Su pedido ha sido recibido y se encuentra en proceso',
//         from: twilioRegPhoneSms,
//         to: '+5492216334092'
//     }

//     await sendOrder(smsMessage);

//     // RESPONSE
//     res.json({
//         status: "pedido enviado"
//     })

// }