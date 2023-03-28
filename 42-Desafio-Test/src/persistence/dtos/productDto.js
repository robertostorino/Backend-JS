// Backlog: Cuando cree el id autoincremental propio, cambiar _id por id

class ProductDTO {
    constructor({ _id, title, price, thumbnail }) {
        this.id = _id,
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





// export default class PersonaDTO {
//     constructor({ id, nombre, apellido, dni }) {
//         this.id = id
//         this.nombre = nombre
//         this.apellido = apellido
//         this.dni = dni
//     }
// }

// export function transformarADTO(personas) {
//     if (Array.isArray(personas)) {
//         return personas.map(p => new PersonaDTO(p))
//     } else {
//         return new PersonaDTO(personas)
//     }
// }