import { admin } from '../../server';

const authAdmin = (req, res, next) => {
    admin ?
        next()
        : res
            .satus(401)
            .json({
                error: -1,
                descripcion: `route ${req.originalUrl} on method ${req.method} is not authorized`,
            });
}


module.export = authAdmin;