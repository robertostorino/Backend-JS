import { ProductsContainer } from '../containers/container.products.js';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.MONGOOSE_URL
const productsContainer = new ProductsContainer(URL);

const getProducts = async (req, res) => {
    let data = null;
    const id = req.params.id;
    !id
        ? (data = await productsContainer.getAll())
        : (data = await productsContainer.getById(id));
    res.json(data);
};

const createProduct = async (req, res) => {
    let data = await productsContainer.save(req.body);
    res.json(data);
};

const updateProduct = async (req, res) => {
    let data = await productsContainer.updateProduct(req.params.id, req.body);
    res.json(data);
};

const deleteProduct = async (req, res) => {
    let data = await productsContainer.deleteById(req.params.id);
    res.json(data);
};

export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}