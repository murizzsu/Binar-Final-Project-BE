const get_all_category = require("../../controllers/product/get_all_category");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.get("/api/v1/categories", get_all_category)

describe("User GET /api/v1/categories", () => {

    it("Get success", (done) => {
        request(app)
            .get("/api/v1/categories")
            .set("Content-Type", "application/json")
            .expect(200)
            .then((res) => {
                expect(res.body).toBeDefined();
                done();
            })
            .catch(done);
    });

    
});

