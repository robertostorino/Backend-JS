import bcrypt from 'bcrypt';
import { modelUser } from '../models/userModel.js';
import { DaoCart } from "./cartDaoMongoose.js";
import { modelCarts } from "../models/cartModel.js";
import { DaoProduct } from './productDaoMongoose.js';
import { modelProducts } from '../models/productModel.js';
import { getImageFileName } from '../../utils/miscelanius.js';
import { adminNewUserNotification } from '../../utils/notifications.js';

const products = new DaoProduct(modelProducts);
const carts = new DaoCart(modelCarts, products);

export class DaoUser {
    constructor(model) {
        this.model = model
    }

    getUser = async (username) => {
        try {
            let user = await this.model.findOne({ username: username }, { _id: 0, __v: 0 });
            return user
    
        } catch (error) {
            return null
        }
    }
    
    #passwordOk = (password, user) => {
        return bcrypt.compareSync(password, user.password);
    }
    
    #createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    
    loginUser = async (username, password, done) =>{
        try {
            let user = await this.getUser(username)
            if (!user) {
                return done(null, false, console.log('Usuario o contraseña incorrectos' ));
            } else {
                if (this.#passwordOk(password, user)) {
                    return done(null, user)
                } else {
                    return done(null, false, { mensaje: 'Usuario o contraseña incorrectos' });
                }
            }
    
        } catch (error) {
            return done(error);
        }
    }
    
    signupUser = async (req, username, password, done) => {
        try {
            const cart = await carts.saveCart(true);
            let user = await this.getUser(username);
            if (user) {
                return done(null, false, console.log(user.username, 'Usuario ya existe'));
            } else {
                let newUser = new modelUser({
                    username,
                    password: this.#createHash(password),
                    name: req.body.name,
                    address: req.body.address,
                    age: req.body.age,
                    telephone: req.body.cel,
                    avatar: getImageFileName(req),
                    cartId: cart
                })
                newUser.save();
                adminNewUserNotification(newUser);
                return done(null, newUser)
            }
    
        } catch (error) {
            return done(error);
        }
    }
    
    serializeUser = (username, done) => {
        try {
            return done(null, username);
        } catch (error) {
            return done(error);
        }
    }
    
    deserializeUser = async (user, done) => {
        let username;
        user.length == undefined ? username = user.username : username = user[0].username;
        try {
            const user = await modelUser.find({ username: username })
            return user ? done(null, user) : done(null, false);
        } catch (error) {
            return done(error);
        }
    }
};