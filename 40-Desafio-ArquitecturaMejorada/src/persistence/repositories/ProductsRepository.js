import { ProductsDAOFactory } from "../Factories/productsDAOFactory.js"

const factory = new ProductsDAOFactory() 

export class ProductRepository {
    DAO

    constructor() {
        this.DAO = factory.getDao()
    };

    add = async (data) => {
        return await this.DAO.add(data)
    }

    getAll = async () => {
        return await this.DAO.getAll()
    }

    update = async (id, data) => {
        return await this.DAO.update(id, data)
    }

    delete = async (id) => {
        return await this.DAO.delete(id)
    }
}