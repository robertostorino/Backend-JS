import express, { json, urlencoded } from 'express';
import session from 'express-session';
import { productsRouter } from './src/routers/router.products.js';
import { cartsRouter } from './src/routers/router.carts.js';
import { usersRouter } from './src/routers/router.users.js'
import passport from 'passport';
import { connectDB } from './src/middlewares/mongoConnection.js';
import mongoStore from 'connect-mongo';
import fileUpload from 'express-fileupload';
import { logNotImplementedRequest, logRequest } from './src/middlewares/middleware.logs.js'
import { logger } from './src/constants/config.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = direname(__filename);

import dotenv from 'dotenv';
dotenv.config();

connectDB(process.env.MONGOOSE_URL);

const app = express();

const advancedOptions = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGOOSE_URL,
            mongoOptions: advancedOptions,
            collectionName: process.env.SESSION_COLLECTION,
            ttl: 600,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(json());
app.user(urlencoded({ extended: true }));
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartsRouter);
app.use(usersRouter);
app.all('*', logNotImplementedRequest, (req, res) => {
    const { url, method } = req;
    res.send(`Requested route ${url} with ${method} method is not implemented`);
});

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});
