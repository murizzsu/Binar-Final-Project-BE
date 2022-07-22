const product_get_id = require("../../controllers/product/product_get_id");
const { Products } = require("../../models");
const express = require("express");
const request = require("supertest");
const login = require("../../controllers/user/login");

jest.setTimeout(20000);
const app = express();
app.use(express.json());
app.get("/api/v1/products/:id", product_get_id);
app.post("/api/v1/login", login);
let product;


describe("Get /api/v1/products/:id", () => {
  const productsModel = Products;

  describe("Successfull Operation", () => {
    
    beforeAll(async() => {
        product = await productsModel.create({
            user_id: 1,
            category_id: 1,
            name: "DataTypes.STRING",
            price: "DataTypes.FLOAT",
            description: "DataTypes.TEXT",
            status: "open_for_bid",
            });
    });

    afterAll(
      async () => await productsModel.destroy({ where: { id: product.id } })
    );

    it("Response 200",  (done) => {
      request(app)
        .get(`/api/v1/products/${product.id}`)
        .expect(200)
        .then(() => {
          expect.objectContaining({
            name: product.name,
            price: product.price,
            description: product.description,
            status: product.status,
            category: product.category,
          });
          done()
        }).catch(done)
        
    });
  });

  describe("error", () => {
    it("Response 404", (done) => {
      request(app)
        .get(`/api/v1/products/-100`)
        .expect(404)
        .then((res) => {
          expect(res.body.message).toEqual("Product Not Found");
          done();
        })
        .catch(done);
    });

  });
});
