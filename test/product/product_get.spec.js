const product_get = require("../../controllers/product/product_get");
const express = require("express");
const request = require("supertest");
const { query } = require("express");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.get("/api/v1/products", product_get)

describe("GET /api/v1/products", () => {
    let queryProduct = {
        status: "open_for_bid",
        name:'baju',
        user_id:1,
    }
    it("Get success", (done) => {

        request(app)
            .get("/api/v1/products")
            .set("Content-Type", "application/json")
            .query(queryProduct)
            .expect(200)
            .then((res) => {
                expect(res.body).toBeDefined();
                done();
            })
            .catch(done);
    });

});


