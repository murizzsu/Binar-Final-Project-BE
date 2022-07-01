const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const product_post = require("../controllers/product/product_post");
const authenticator = require("../controllers/middleware/authenticator");
const migrator = require("../migrator");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.post("/api/v1/products", authenticator, product_post)

describe("test product_post", () => {
    beforeEach(async () => {
        return migrator()
    });
    it("post product", async () => {
        const validation = await Users.findOne({
            where: { email: "rizky@gmail.com" },
        });
        let user = {
            id: validation.id,
            email: validation.email,
            img_url: validation.img_url,
            name: validation.name,
            city: validation.city,
            address: validation.address,
            phone: validation.phone
        };
        let token = jwt.sign(user, "s3cr3t");
        let product = {
            "id": 1,
            "user_id": 1,
            "category_id": 1,
            "name": "productName",
            "price": 100000.1,
            "description": "productDescription",
            "img_url": "http://xyz.png",
            "sold": false,
        }
        const response = await request(app)
            .post("/api/v1/products")
            .set("Content-Type", "application/json")
            .set("authorization", `Bearer ${token}`)
            .send(product)
            .expect(201)
        expect(response.body.name).toEqual(product.name);
    })
})