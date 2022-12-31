import { moment } from "moment";
import { config } from "../../../constants/config.js"


export class MongoProduct {
    constructor (model){
        this.model = model;
    }

    // Return an array of all products
    getAllProducts = async () => {
        let products = await this.model.find({}, {__V:0});
        if (!products.length) {
            const response = {
                error: 1,
                message: 'No products was found'
            }
            return response;
        } else {
            products
        }
    }

    // Given an id, this function returns the product
    getProduct = async (id) => {
        try {
            return await this.model.find( { id: id.toString() }, { __V: 0 });
        } catch (error) {
            return false;            
        }
    }

    // Given a product, this function save it 
    saveProduct = async (data) => {
        try{
            let lastId = await this.model.find({}).sort({ id: -1}).limit(1);
            let newId = last.length > 0 ?
                                    parseInt(lastId(-1).id + 1)
                                    : 1;

            let prod = new this.model({
                id: newId,
                timestamp: moment().format(config.timeFormat), ...data
            });
            const newProduct = await prod.save();

            return await this.getProduct(newId);
        } catch (error) {
            const response = {
                error: 1,
                message: "Error while saving product"
            }
            return response;
        }
    }

    // Given an id, this function delete product
    deleteProduct = async (id) => {
        let response = {};
        let del = await this.model.deleteOne({ id: id });
        if (del.deletedCount >= 1){
            response.error = 0,
            response.message = `The product with id: ${id} has been deleted`;
        } else {
            response.error = 1,
            response.message = "Task uncompleted, product not found";
        }
        return response;
    }

    // This function update product by id
    updateProduct = async (id, data) => {
        try {
            let actualizar = await this.updateOne({ id: id }, data);
            if (actualizar.modifiedCount) return await this.getProduct(id);
        } catch (error) {
            return false;
        }
    }

    //
    filter = async (param, criteria, value) => {
        criteria = criteria == "==" ? "=" : criteria;
        try {
            return await this.database
                    .select()
                    .from(this.table)
                    .where(param, criteria, value)
        } catch (error) {
            return [];
        }
    }
}