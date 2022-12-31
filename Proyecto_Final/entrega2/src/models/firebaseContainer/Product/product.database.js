import moment from "moment";
import { config as configRoot } from "../../../constants/config.js";

export class FireProduct {
    constructor(model) {
        this.model = model
    }

    // Method to get all products
    getAllProducts = async (toSave = false) => {
        let productos = []
        const response = await this.model.get()
        response.forEach(producto => {
            productos.push(producto.data());
        });
        if (!productos.length) {
            if(toSave) return [];
            const response = {
                error: 1,
                message: `Not products found`
            }
            return response;
        } else {
            return productos;
        }
    }

    //Method to get product by id
    getProduct = async (id) => {
        try {
            const doc = await this.model.doc(`${id}`).get();
            const response = [doc.data()];
            return response;
        } catch (error) {
            return false;
        }
    }

    // Method to save product
    saveProduct = async (data) => {
        try {
            const productos = await this.getAllProducts(true);
            data.id = productos.length > 0 ? parseInt(productos.at(-1).id + 1) : 1;
            data.timestamp =  moment().format(configRoot.timeFormat);
            let doc = this.model.doc(`${data.id}`);
            await doc.create(data);
            return await this.getProduct(data.id);
        } catch (error) {
            const response = {
                error: 1,
                message: `Error saving product`
            }
            return response;
        }
    }

    // Method to delete product by id
    deleteProduct = async (id) => {
        let response = {};
        try {
            await this.model.doc(`${id}`).delete();
            response.error = 0;
            response.message = `The product with id: ${id} has been deleted`;
        } catch (error) {
            response.error = 1;
            response.message = "Task could not be completed, product not found";
        }
        return response;
    }

    // Method to update product by id
    updateProduct = async (id, data) => {
        try {

            const doc = await this.model.doc(`${id}`).update(data);
            return await this.getProduct(id);

        } catch (error) {
            return false;
        }
    }

    filter = async (paramter, criteria, value) => {
        criteria = criteria == "==" ? "=" : criteria;
        try {
            return await this.database
                .from(this.table)
                .where(paramter, criteria, value)
                .select();
        } catch (error) {
            return [];
        }
    }


}