const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const product_post = require("../controllers/product/product_post");
const authenticator = require("../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.post("/api/v1/products", authenticator, product_post)

describe("Product POST /api/v1/product", () => {
    describe("Post success", () => {
        beforeAll(() => {

        })

        afterAll(() => {

        })

        it("post product", async () => {
            const validation = await Users.findOne({
                where: { email: "rizky@gmail.com" },
            });
            let user = {
                id: validation.id,
                email: validation.email,
                name: validation.name,
                city: validation.city,
                address: validation.address,
                phone: validation.phone,
                img_url: validation.img_url,

            };
            let token = jwt.sign(user, "s3cr3t");
            let product = 
                    {
                      "id": 1,
                      "name": "productName1",
                      "price": 100000.1,
                      "description": "productDescription1",
                      "status": "open_for_bid",
                      "category": {
                        "id": 1,
                        "name": "categoryName"
                      },
                      "owner": {
                        "id": 1,
                        "name": "name1",
                        "city": "city1",
                        "address": "address1",
                        "phone": 85754210821
                      },
                      "images": [
                        {
                          "id": 1,
                          "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657632067/binar-final-project/products/mpcihgalctsoaavwosxr.png"
                        },
                        {
                          "id": 2,
                          "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657632067/binar-final-project/products/mpcihgalctsoaavwosxr.png"
                        },
                        {
                          "id": 3,
                          "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657632067/binar-final-project/products/mpcihgalctsoaavwosxr.png"
                        },
                        {
                          "id": 4,
                          "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657632067/binar-final-project/products/mpcihgalctsoaavwosxr.png"
                        }
                      ]
                    }
            const response = await request(app)
                .post("/api/v1/products")
                .set("Content-Type", "application/json")
                .set("authorization", `Bearer ${token}`)
                .send(product)
                .expect(200)
        expect(response.body.name).toEqual(product.name);
        })
    })

    describe("Post unsuccess", () => {

    })
})
