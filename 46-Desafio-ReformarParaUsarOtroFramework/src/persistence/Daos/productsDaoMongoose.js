import { response } from "express";
import { transformToDto } from "../dtos/productDto.js";

class DaoProducts {
    constructor(model) {
        this.model = model
    }
    
    // Backlog: Crear id autoincremental propio
    add = async (data) => {
        const dataAdd = new this.model(data);
        const add = await dataAdd.save();
        return transformToDto(add);
    };

    getById = async (id) => {
        const data = await this.model.findById(id);
        return transformToDto(data);
    }

    getAll = async () => {
        const data = await this.model.find();
        return transformToDto(data);
    };

    update = async (id, data) => {
        const up = await this.model.updateOne({_id: id}, data);
        const updated = await this.getById(id)
        return transformToDto(updated);
    };
    
    delete = async (id) => {
        let response = {};
        const deleted = await this.model.deleteOne({_id : id});
        if (deleted.deletedCount == 1) {
            response.error = 0,
            response.message = `The product with id: ${id} has been deleted`;
        } else {
            response.error = 1;
            response.message = "Task could not be completed, product not found";
        }
        return response;
    };
    
}

export {
    DaoProducts
};