import { logger } from "../utils/logger.js";

function destroyCredentials(req, res) {
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
}

function renderSignUp(req, res) {
    const { method } = req
    logger.info(`Access to route: /signup method: ${method}`)
    return req.isAuthenticated()
        ? res.redirect("/")
        : res.render("signup",{ script: 'signup' });
}

function renderFailLogin(req, res) {
    const { method } = req
    logger.info(`Access to route: /login/error method: ${method}`)
    return req.isAuthenticated()
        ? res.redirect("/")
        : res.render('error', { process: 'LOGIN' })
}

function renderFailSignUp(req, res) {
    const { method } = req
    logger.info(`Access to route: /signup/error method: ${method}`)
    return req.isAuthenticated()
        ? res.redirect("/")
        : res.render('error', { process: 'SIGNUP' })
}

function renderLogin(req, res) {
    const { method } = req
    logger.info(`Access to route: /login method: ${method}`)
    return req.isAuthenticated()
        ? res.redirect("/")
        : res.render("login");
}

async function savePicturesLocal (req, res, next) {
    try {
        let ext = req.files.avatar.mimetype.split('/')[1];
		let avatar = req.files.avatar;
		avatar.mv(`./public/avatars/${req.body.username}.${ext}`);
	} catch (error) {
		logger.error(error)
	}
	next();
};


export {
    destroyCredentials,
    renderFailLogin,
    renderLogin,
    renderFailSignUp,
    renderSignUp,
    savePicturesLocal
};

