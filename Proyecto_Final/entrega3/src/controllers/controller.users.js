import { UsersContainer } from '../containers/container.users.js';
import { CartsContainer } from '../containers/container.carts.js';
import { ProductsContainer } from '../containers/container.products.js';

const usersContainer = new UsersContainer();
const cartsContainer = new CartsContainer();
const productsContainer = new ProductsContainer();

const requireAuthentication = (req, res, next) => {
    if (req.isAuthenticated()){
        next()
    } else {
        res.redirect('/login')
    }
};

const savePicturesLocal = async (req, res, next) => {
    try {
        const image = req.files.imagen;
        const username = req.body.username;
        image.mv(`./public/images/${username}.jpg`);
    } catch (error) {
        console.log(error)
    }
};

const getUser = async (req, res) => {
    let usuario = await usersContainer.getUser(req.user.username);
    res.render('inicio', {
        username: usuario.username,
    })
};

const getUserImage = async (req, res) => {
    res.render('imagenUsuario', { imagen: `${req.params.username}`})
};

const getMyUserData = async (req, res, next) => {
    try {
        let user = await usersContainer.getUser(req.user.username);
        res.render('usuario', { usuario: user, imagen: user.username});
    } catch (error) {
        console.log(error)
    }
};

const getMyCart = async (req, res) => {
	try {
		let user = await usersContainer.getUser(req.user.username);
		let carrito = await cartsContainer.getByCartId(user.cartId);
		let compra = Boolean;
		res.render('carrito', { carrito: carrito, user: user.username, compra: compra });

	} catch (error) {
		console.log(error);
	}
};

const getProducts = async (req, res) => {
    try {
        if (!req.params.tipo) {
            let products = await productsContainer.getAll();
            res.render('productos', { products: products });
        }
        if (req.params.tipo === 'Alcoholicas') {
            let products = await productsContainer.getAll();
            let productsAlcoholicas = products.filter( product => product.tipo === 'Alcoholica');
            res.render('productos', { products: productsAlcoholicas });
        }
        if (req.params.tipo === 'NoAlcoholicas') {
            let products = await productsContainer.getAll();
			let productsNoAlcoholicas = products.filter(product => product.tipo === 'NoAlcoholica');
			res.render('productos', { products: productsNoAlcoholicas });
        }
    } catch (error) {
        console.log(error)
    }
};

const newOrderNotification = async (req, res) => {
    const user = await usersContainer.getUser(req.user.username);
    const carrito = await cartsContainer.getByCartId(user.cartId)
    const products = carrito.productos;
    let generateOrder = {};
    products.forEach(product => {
        generateOrder[product.nombre]
            ? generateOrder[product.nombre]++
            : generateOrder[product.nombre] = 1
    });
    const newOrder = JSON.stringify(generateOrder);
    let compra = Boolean;
    adminNewOrderNotification(user, newOrder);
    newOrder ? compra = true : compra = false;

    userOrderNotification(user.telefono);

    res.render('carrito', { carrito: carrito, user: user.username, compra: compra});
};

const logout = (req, res) => {
    res.render('endSession', { userName: req.user.username });
    setTimeout(() => {
        req.logout((error) => {
            error ? 'Error while closing session' : 'Session successfuly deleted';
        })
    })
};

const failLogin = (req, res) => {
    res.render('login-error')
};

export { 
    requireAuthentication, 
    savePicturesLocal, 
    getUser, 
    getUserImage, 
    getMyUserData,
    getMyCart,
    getProducts,
    newOrderNotification,
    logout,
    failLogin
};