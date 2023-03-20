import { transformToDto } from "../dtos/productDto.js";

class DaoProducts {
    constructor(model) {
        this.model = model
    }
    
    // Backlog: Crear id autoincremental propio
    add = async (data) => {
        const dataAdd = new this.model(data);
        const add = await dataAdd.save();
        return add;
    };

    get = async (id) => {
        if (id) {
            const data = await this.model.findById(id);
            return transformToDto(data);
        }
        else{
            const data = await this.model.find();
            return transformToDto(data);
        }
    };

    update = async (id, data) => {
        const update = await this.model.updateOne({_id: id}, data);
        return transformToDto(update);
    };
    
    delete = async (id) => {
        const deelete = await this.model.deleteOne({_id : id});
        return transformToDto(deelete);
    };
    
}

export {
    DaoProducts
};