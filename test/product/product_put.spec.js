const { Products } = require("../../models");
const product_put = require("../../controllers/product/product_put");
const authenticator = require("../../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");
const login = require("../../controllers/user/login");

jest.setTimeout(20000);
const app = express();
app.use(express.json());
app.put("/api/v1/products/:id", authenticator, product_put);
app.post("/api/v1/login", login)

describe("PUT /api/v1/products/:id", () => {
  const productsModel = Products;

  describe("Successfull Operation", () => {
    let product;
    let token;
    const userCredential = {
      email: "rizky@gmail.com",
      password: "12345"
    }

    beforeAll((done) => {
      request(app)
        .post('/api/v1/login')
        .send(userCredential)
        .end(async (err, res) => {
          if (err) return done(err)
          expect(res.header['content-type']).toMatch(/json/)
          expect(res.status).toEqual(200)
          token = res.body.token

          product = await productsModel.create({
            user_id: 1,
            category_id: 1,
            name: "DataTypes.STRING",
            price: "DataTypes.FLOAT",
            description: "DataTypes.TEXT",
            status: "open_for_bid",
          });
          done()
        })
    });

    afterAll(async () => {
      await productsModel.destroy({ where: { id: product.id } });
    });

    it("response 200", (done) => {
      request(app)
        .put(`/api/v1/products/${product.id}`)
        .set("Authorization", `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual("Successfully updated product");
          done();
        })
        .catch(done);
    });
  });


});
