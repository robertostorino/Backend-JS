import bcrypt from 'bcrypt';
import { mongoUser } from '../Mongo.models.js';
import { MongoCart } from "../Cart/cart.database.js";
import { mongoCart } from "../Mongo.models.js";
import { MongoProduct } from '../Product/product.database.js';
import { mongoProduct } from '../Mongo.models.js';
import { getImageFileName } from '../../../utils/miscelanius.js';
import { notifyNewUserToAdmin } from '../../../utils/notificaton.js';

const products = new MongoProduct(mongoProduct);
const carts = new MongoCart(mongoCart, products);

async function getUser(username) {
    try {
        let user = await mongoUser.findOne({ username: username }, { _id: 0, __v: 0 });
        return user

    } catch (error) {
        return null
    }
}

function passwordOk(password, user) {
    return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

async function loginUser(username, password, done) {
    try {
        let user = await getUser(username)
        if (!user) {
            return done(null, false, console.log('Usuario o contraseña incorrectos' ));
        } else {
            if (passwordOk(password, user)) {
                return done(null, user)
            } else {
                return done(null, false, { mensaje: 'Usuario o contraseña incorrectos' });
            }
        }

    } catch (error) {
        return done(error);
    }
}


async function signupUser(req, username, password, done) {
    try {
        const cart = await carts.saveCart(true);
        let user = await getUser(username);
        if (user) {
            return done(null, false, console.log(user.username, 'Usuario ya existe'));
        } else {
            let newUser = new mongoUser({
                username,
                password: createHash(password),
                name: req.body.name,
                address: req.body.address,
                age: req.body.age,
                telephone: req.body.cel,
                avatar: getImageFileName(req),
                cartId: cart
            })
            await notifyNewUserToAdmin(newUser)
            newUser.save();
            return done(null, newUser)
        }

    } catch (error) {
        return done(error);
    }
}

function serializeUser(username, done) {
    try {
        return done(null, username);
    } catch (error) {
        return done(error);
    }
}

async function deserializeUser(user, done) {
    let username;
    user.length == undefined ? username = user.username : username = user[0].username;
    try {
        const user = await mongoUser.find({ username: username })
        return user ? done(null, user) : done(null, false);
    } catch (error) {
        return done(error);
    }
}


export {
    loginUser,
    signupUser,
    serializeUser,
    deserializeUser,
    getUser
}