import { ProductContainer } from "../models/ProductContainer";
import productRouter, { productContainer } from "../router/routerProduct";

async getProducts = (req, res) => {
    console.log(req.params.id);
    res
        .status(200)
        .json(
            !req.params.id
                ? await ProductContainer.getAll()
                : ProductContainer.getById(req.params.id)
        );
};

async postProducts = (req, res) => {
    const { nombre, descripcion, codigo, foto, precio, stock} = req.body;
    const newProduct = {
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
    };
    const idNew = await ProductContainer.save(newProduct);
    res
        .status(201)
        .json({ status: "ok", newProductId: idNew });
};

async putProducts = (req, res) => {
    const { nombre, descripcion, codigo, foto, precio, stock} = req.body;
    const newProduct = {
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
    };
    const id = await ProductContainer.updateById(req.params.id, updatedProduct);
    res
        .
}

