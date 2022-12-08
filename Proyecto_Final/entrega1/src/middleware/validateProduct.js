import { productContainer } from "../router/routerProduct";

validateId = (req, res, next) => {
    (productContainer.getById(req.params.id) == null && req.params.id != null)
    ?
    res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exists"})
    : next();
}

existsProduct = (req, res, next) => {
    (productContainer.getById(req.param.id) == null)
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exist"})
    : next();
}

module.export = {
    validateId,
    existsProduct
};