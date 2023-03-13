import passport from "passport";

async function register(req, res) {
    res.render('register')
};

async function failregister(req, res) {
    res.render('failregister')
};

export default {
    register,
    failregister,
}