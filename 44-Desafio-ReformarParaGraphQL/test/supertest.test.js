import request from "supertest";
import { deepStrictEqual } from 'assert';
import { fakeProds } from '../utils/fakeData.js';


const req = request("http://localhost:8080");

describe("CHECKING SERVER ONLINE SUPERTEST TEST", async function() {

    before(function () {
        console.log("---------- SUPERTEST TEST STARTS  --------");
    })
    after(function () {
        console.log("---------- SUPERTEST TEST ENDS --------");
    })

    it("Read products", async function() {
        const response = await req.get("/products")
        deepStrictEqual(true, Array.isArray(response._body));
    })
    it("Post a product", async function() {
        const newProduct = fakeProds();
        const response = await req.post(`/products`).send(newProduct);
        deepStrictEqual(response.body, {_id: response.body._id, ...newProduct})
        await req.delete(`/products/${response.body._id}`);
    })
    it("Update a product", async function() {
        const newProduct = fakeProds();
        let response = await req.post(`/products`).send(newProduct);
        let insertedProduct = response.body;
        insertedProduct.price = 4000;
        response = await req.put(`/products/${insertedProduct._id}`).send(insertedProduct);
        deepStrictEqual(response.body, insertedProduct)
        await req.delete(`/productos/${response.body._id}`);
    })
    it("Delete a product", async function() {
        const newProduct = fakeProds();
        let response = await req.post(`/products`).send(newProduct);
        let insertedProduct = response.body;
        response = await req.delete(`/products/${insertedProduct._id}`);
        deepStrictEqual(response.body.error, 0)
    })
})