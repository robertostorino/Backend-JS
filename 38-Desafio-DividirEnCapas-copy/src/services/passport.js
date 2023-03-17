// import passport from 'passport';
// import { Strategy as LocalStrategy} from 'passport-local';

// import usuarios from '../containers/usuariosContainers.js'

// passport.serializeUser((username, done) => {
//     try {
//         return done(null, username);
//     } catch (error) {
//         return done(error);
//     }
// });

// passport.deserializeUser((username, done) => {
//     const user = usuarios.getUser(username);
//     return done(null, user)
// });

// //-----------------------------//
// // Passport Middleware Register
// //-----------------------------//
// function passportRegister(req, res, next) {
//     passport.use('register', new LocalStrategy (
//         { passReqToCallback: true }, 
//         async (req, username, password, done) => {
//             const { email } = req.body
            
//             const userAlreadyRegistered = await usuarios.getUser(username);
            
//             if (userAlreadyRegistered) {
//                 console.log('usuario en uso');
//                 return done(null, false)
//             }
    
//             const newUser = {
//                 username,
//                 email,
//                 password: createHash(password)
//             }
    
//             usuarios.createUser(newUser);
    
//             // Done es el callback de verificacion como next. El 1º arg de Done: si hubo un error o no. El 2º arg: objeto
//             done(null, newUser);
    
//         }
//     ))
// }

// function passportLogin(req, res, next){
//     passport.use('login', new LocalStrategy(
//         async (username, password, done) => {
            
//             const user = await usuarios.getUser(username);
            
//             if (!user) {
//                 return done(null, false, console.log('Usuario o contraseña incorrectos' ));
//             } 
            
//             if (!passwordOk(password, user)) {
//                     return done('password incorrecta', user)
//             } 
            
//             user.contador = 0; //Dentro de usuario crea la variable contador inicializada en 0
    
//             return done(null, user)
    
//         }
//     ))
// }


// // passport.use('register', new LocalStrategy ({
// //     passReqToCallback: true
// //     }, async (req, username, password, done) => {
// //         const { email } = req.body
        
// //         const userAlreadyRegistered = await usuarios.getUser(username);
        
// //         if (userAlreadyRegistered) {
// //             console.log('usuario en uso');
// //             return done(null, false)
// //         }

// //         const newUser = {
// //             username,
// //             email,
// //             password: createHash(password)
// //         }

// //         usuarios.createUser(newUser);

// //         // Done es el callback de verificacion como next. El 1º arg de Done: si hubo un error o no. El 2º arg: objeto
// //         done(null, newUser);

// //     }
// // ));

// //--------------------//
// // Passport Login     //
// //--------------------//




// // passport.use('login', new LocalStrategy(
// //     async (username, password, done) => {
        
// //         const user = await usuarios.getUser(username);
        
// //         if (!user) {
// //             return done(null, false, console.log('Usuario o contraseña incorrectos' ));
// //         } 
        
// //         if (!passwordOk(password, user)) {
// //                 return done('password incorrecta', user)
// //         } 
        
// //         user.contador = 0; //Dentro de usuario crea la variable contador inicializada en 0

// //         return done(null, user)

// //     }
// // ))

// export default {
//     passportLogin,
//     passportRegister
// }