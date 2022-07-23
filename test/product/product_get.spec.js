const product_get = require("../../controllers/product/product_get");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.get("/api/v1/products", product_get)

describe("GET /api/v1/products", () => {

    it("Get success", (done) => {

        request(app)
            .get("/api/v1/products")
            .set("Content-Type", "application/json")
            .expect(200)
            .then((res) => {
                expect(res.body).toBeDefined();
                done();
            })
            .catch(done);
    });

});


