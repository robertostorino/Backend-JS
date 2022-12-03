const fs = require('fs');

class validator {
    
    /**
     * @param {any} ref 
     * @returns boolean
     */
    isset(ref){
        return typeof red !== 'undefined'
    }

    /**
     * @param {string} path 
     * @returns object
     */
    issetFile(path) {
        const resIsset = {}
        try {
            let array = fs.readFileSync(path, 'utf-8');
            resIsset.error = 0;
            resIsset.elements = JSON.parse(array);
            return resIsset;
        } catch (error) {
            resIsset.error = 1;
            resIsset.elements = [];
            return resIsset;
        }
    }

    /** 
     *   Method to validate the structure of product
     *  @param {object} object
     *  @returns boolean
    **/
    validObject(object) {
        return this.isset(object) && this.isset(object.title) && this.isset(object.price) && this.isset(object.thumbnail)
    }

    /**
     * Method to validate the structure of message
     * @param {object} object
     * @returns boolean
     */
    validMessage(object) {
        return this.isset(object) && this.isset(object.author) && this.isset(object.text) && this.isset(object.date)
    }
}

module.exports = validator