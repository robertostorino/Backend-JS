import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import ProductsService from "../services/products.js";

const schema = buildSchema (`
    type Product {
        id: ID!,
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    type Response {
        error: Int,
        message: String
    }
    input ProductInput {
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    type Query {
        getAll: [Product]
        getById(id: ID!): [Product]
    }
    type Mutation {
        save(product: ProductInput): [Product]
        update(id: ID!, product: ProductInput): [Product]
        delete(id: ID!): Response
    }`
);

export default class GraphQLController {
    constructor() {
        const service = new ProductsService();
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getAll: service.getAllProducts,
                getById: service.getProductById,
                save: service.insertProduct,
                update: service.updateProductGraphQL,
                delete: service.deleteProduct
            },
            graphiql: true
        })
    }
}