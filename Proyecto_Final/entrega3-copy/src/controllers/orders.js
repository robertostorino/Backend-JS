import UsersService from '../services/users.js';
import CartsService from '../services/carts.js';
import { adminNewOrderNotificationMail, userOrderNotificationSMS, userOrderNotificationWhatsapp } from '../utils/notifications.js';

const serviceUser = new UsersService();
const serviceCart = new CartsService()

export const notifyOrder = async (req, res) => {
    const cartId = req.user[0].cartId;
    let cart = await serviceCart.getCart(cartId);
    const user = await serviceUser.getUser(req.session.passport.user.username);
    let userOrder = cart[0].products
    let userTelephone = user.telephone

    adminNewOrderNotificationMail(user, userOrder);
    userOrderNotificationSMS(userTelephone);
    userOrderNotificationWhatsapp(userTelephone);

    serviceCart.clearCart(cartId);
    let cartProducts = cart[0].products;
    const newOrder = JSON.stringify(cartProducts);
    res.json({error: 0, message: 'Order Created'})
};