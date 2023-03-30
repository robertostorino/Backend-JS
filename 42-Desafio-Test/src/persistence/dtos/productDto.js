// Backlog: Cuando cree el id autoincremental propio, cambiar _id por id

class ProductDTO {
    constructor({ _id, title, price, thumbnail }) {
        this._id = _id,
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
};

export function transformToDto(products) {
    if (Array.isArray(products)) {
        return products.map(p => new ProductDTO(p))
    } else {
        return new ProductDTO(products)
    }
};

export default { ProductDTO };
