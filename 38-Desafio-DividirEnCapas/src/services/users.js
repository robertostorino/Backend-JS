import { containerMongoose } from "../containers/containerMongoose.js";
const Usuario = new containerMongoose();

async function get(id) {
    let result
    if (id) {
        Usuario.get(id)
            .then(usuarios => {
                result = res.json(usuarios);
            })
            .catch(err => {
                result = res.json(err);
            })
    }
    else{
        Usuario.get()
            .then(usuarios => {
                result = res.json('index', {usuarios});
            })
            .catch(err => {
                result = res.json(err);
            })
    }

    return result
}



export default {
    get,
}