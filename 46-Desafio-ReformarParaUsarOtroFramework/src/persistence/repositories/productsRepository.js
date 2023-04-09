import { ProductsDAOFactory } from "../Factories/productsDAOFactory.js"

const factory = new ProductsDAOFactory() 

export class ProductRepository {
    DAO

    constructor() {
        this.DAO = factory.getDao()
    };

    add = async (data) => {
        const addedProduct = await this.DAO.add(data)
        return addedProduct
    }

    getById = async (id) => {
        return await this.DAO.getById(id)
    }

    getAll = async () => {
        return await this.DAO.getAll()
    }

    update = async (id, data) => {
        const updated = await this.DAO.update(id, data)
        return updated
    }

    delete = async (id) => {
        const del = await this.DAO.delete(id)
        return del
    }
}