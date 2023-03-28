import { faker } from '@faker-js/faker'
// import { transformToDTO } from '../../persistence/DTOs/product.dto.js';
faker.locale = 'es'

export const fakeProds = () => ({
    title: faker.commerce.product(),
    price: parseInt(faker.commerce.price()),
    thumbnail: faker.image.avatar()
});