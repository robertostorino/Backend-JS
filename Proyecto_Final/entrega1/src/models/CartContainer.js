const fs = require('fs');

class CartContainer {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    async saveCart(){
        try {
            const cart = {
                id: Date.now(),
                timestamp: new Date(),
                products: []
            }
            const carts = await this.getAllCarts();
            carts.push(cart);
            await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2))
            return cart.id
        } catch (error) {
            
        }
    }
}