import { containerMongoose } from "../persistence/containers/containerMongoose.js"
const usuarios = new containerMongoose();

async function auth (req, res){
    const usuario = req.session.passport.user.username
    const username = await usuarios.getUser(usuario)
    res.render('index', { user: username.username })
};

export default { auth }