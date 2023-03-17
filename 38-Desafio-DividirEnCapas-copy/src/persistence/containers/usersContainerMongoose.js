import bcrypt from 'bcrypt';

class containerUsers {
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

    loginUser = async (username, password, done) => {
        try {
            let user = await this.getUser(username)
            if (!user) {
                return done(null, false, console.log('Usuario o contraseña incorrectos'));
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


    registerUser = async (username, password, done) => {
        try {
            let user = await this.getUser(username);
            if (user) {
                return done(null, false, console.log(user.username, 'Usuario ya existe'));
            } else {
                let nuevoUsuario = new this.model({
                    username,
                    password: this.#createHash(password)
                })
                nuevoUsuario.save();
                return done(null, nuevoUsuario)
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
            const user = await this.model.find({ username: username })
            return user ? done(null, user) : done(null, false);
        } catch (error) {
            return done(error);
        }
    }

    #passwordOk = (password, user) => {
        return bcrypt.compareSync(password, user.password);
    }

    #createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    // async getUser(username){
    //     try {
    //         let user = await modelsUsers.findOne({ username: username }, {_id:0, __v:0});
    //         return user;
    //     } catch (error) {
    //         return null;
    //     }
    // };

    // async loginUser(username, password, done){
    //     // try {
    //         let user = await this.getUser(username)
    //         console.log(user)
    //         if (!user) {
    //             return done(null, false, logger.warn('Usuario o contraseña incorrectos'));
    //         } 
    //         // else {
    //         //     if (this.#passwordOk(password, user)) {
    //         //         return done(null, user)
    //         //     } else {
    //         //         return done(null, false, { mensaje: 'Usuario o contraseña incorrectos'})
    //         //     }
    //         // }

    //         if (!this.#passwordOk(password, user)) {
    //             return done('password incorrecta', user)
    //         } 
            
    //         user.contador = 0; //Dentro de usuario crea la variable contador inicializada en 0

    //         return done(null, user)

    //     // } catch (error) {
    //     //     return done(error)
    //     // }
    // };

    // registerUser = async (username, password, done) => {
    //     try {
    //         let user = await this.getUser(username);
    //         if (user) {
    //             return done(null, false, console.log(user.username, 'Usuario ya existe'));
    //         } else {
    //             let nuevoUsuario = new this.model({
    //                 username,
    //                 password: this.#createHash(password)
    //             })
    //             nuevoUsuario.save();
    //             return done(null, nuevoUsuario)
    //         }

    //     } catch (error) {
    //         return done(error);
    //     }
    // }
    
    // // async createUser(user){
    // //     try{
    // //         await modelsUsers.create(user);
    // //         logger.info('user created');
    // //     } catch(err) {
    // //         logger.error(err)
    // //     };
        
    // // };

    // // PASSPORT
    // serializeUser = (username, done) => {
    //     try {
    //         return done(null, username);
    //     } catch (error) {
    //         return done(error);
    //     }
    // };

    // // deserializeUser = async (username, done) => {
    // //     const user = this.getUser(username);
    // //     return done(null, user)
    // // };

    // deserializeUser = async (user, done) => {
    //     let username;
    //     user.length == undefined ? username = user.username : username = user[0].username;
    //     try {
    //         const user = await this.model.find({ username: username })
    //         return user ? done(null, user) : done(null, false);
    //     } catch (error) {
    //         return done(error);
    //     }
    // }

    // #passwordOk = (password, user) => {
    //     return bcrypt.compareSync(password, user.password)
    // };

    // #createHash = (password) => {
    //     return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    // };

}

export {
    containerUsers
};