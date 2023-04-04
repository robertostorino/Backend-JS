import { ProductRepository } from "../persistence/repositories/ProductsRepository.js";
import { generateFakeProds } from "../../utils/generateFakeProds.js";

const persistence = new ProductRepository();

export default class ProductsService {
    constructor() {
        this.persistence = persistence
    }

    getAllProducts = async () => {
        return await this.persistence.getAll()
    };
    
    getProductById = async (id) => {
        return await this.persistence.getById(id)
    }
    
    insertProduct = async (product) => {
        const addedProduct = await this.persistence.add(product)
        return addedProduct
    };
    
    updateProduct = async (id, data) => {
        const updatedProduct = await this.persistence.update(id, data)
        return updatedProduct
    }
    
    deleteProduct = async (id) => {
        const deleted = await this.persistence.delete(id)
        return deleted
    }

    fakerProducts = (req) => {
        let cant = req.query.cant || 5;
        let products = [];
        for (let i = 0; i < cant; i++) {
            //It'll generate products and then save them
            let newProduct = generateFakeProds(); //Generate product with faker
            products.push(newProduct); //Shows new products
            // logger.info(productsFaker)
        }
        return products
    }

    updateProductGraphQL = async ({id, product}) => {
        return await this.updateProduct(id, product);
    }
};