import ProductModel from "../models/model.product.js";

class ProductsContainer {
    constructor(url) {
        this.url = url;
    }

    async save(obj) {
        let newProduct = new ProductModel({ timestamp: Date.now(), ...obj });
        try {
            await newProduct.save();
            return ('Product has been correctly added.')
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
    };

    async getById(id) {
        let data = null;
        try {
            data = await ProductModel.findById(id);
            return data ? data : "Product doesn't exist";
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
    };

    async updateProduct (id, update) {
        let data = null;
        try {
            data = await ProductModel.updateOne({ _id: id}, { $set: update });
            return data.modifiedCount ? 'Product has been correctly updated.' : 'Product has not been updated.';
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
    };

    async getAll () {
        let data = null;
        try {
            data = await ProductModel.find();
            return (data.length > 0) ? data : 'Collection empty'
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
    };

    async deleteById (id) {
        let data = null;
        try {
            data = await ProductModel.deleteOne({ _id: id });
            return data.deletedCount ? ('Product deleted') : ('Product does not exist');
        } catch (error) {
            console.log(`Something goes wrong ${error}`)
        }
    };
};

export { ProductsContainer };