import services from "../services/users.js";

async function auth (req, res){
    const usuario = req.session.passport.user.username
    const username = await services.getUser(usuario)
    res.render('index', { user: username.username })
};

export default { auth }