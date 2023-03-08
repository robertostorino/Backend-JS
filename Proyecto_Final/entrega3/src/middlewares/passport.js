import { UsersContainer } from '../containers/container.users.js';
import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import { CartsContainer } from '../containers/container.carts.js';
import { adminNewUserNotification } from './notificationManager.js';
import dotenv from 'dotenv';
dotenv.config();

const cartsContainer = new CartsContainer();
const usersContainer = new UsersContainer();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

function serialDeserial(){
    
    passport.serializeUser(( user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser( async ( username, done ) => {
        let usuario = await usersContainer.getUser(username);
        done(null, usuario);
    });
};

function passportRegister(req, res, next) {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                let usuario = await usersContainer.getUser(username);
                let cart = await cartsContainer.createCart();
                if (usuario) {
                    return done(null, false)
                };
                const { nombre, direccion, edad } = req.body;
                const imagen = `${HOST}:${PORT}/imagen/${req.body.username}`;
                const idCart = cart._id.valueOf();
                let newUser = await usersContainer.insertUser(
                    { username, password, nombre, direccion, edad, imagen, idCart });
                sendMailNotification(req.body);
                done(null, newUser);
            }
        )
    );
    next();
};

function passportLogin(req, res, next) {
    passport.use(
        'login',
        new LocalStrategy ( async ( username, password, done ) => {
            let usuario = await usersContainer.getUser( username );
            let auth = await usersContainer.authHash( username, password);

            if (!usuario) return done ( null, false );
            if (!auth) return done ( null, false );
            
            return done ( null, usuario );
        })
    );
    next();
};

export {
    passportRegister,
    passportLogin,
    serialDeserial
};