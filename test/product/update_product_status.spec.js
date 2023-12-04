const { Products } = require("../../models");
const update_product_status = require("../../controllers/product/update_product_status");
const authenticator = require("../../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");
const login = require("../../controllers/user/login");

jest.setTimeout(20000);
const app = express();
app.use(express.json());
app.put('/api/v1/products/:productId/status', authenticator, update_product_status);
app.post("/api/v1/login", login)
let product;
describe("PUT /api/v1/products/:productId/status", () => {
  const productsModel = Products;

  describe("Successfull Operation", () => {

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
            status: "open_for_bid",
          });
          done()
        })
    });


    afterAll(async () => {
      await productsModel.destroy({ where: { id: product.id } });
    });

    it("response 200", (done) => {
      const status = {
        status: 'sold'
      };
      request(app)
        .put(`/api/v1/products/${product.id}/status`)
        .set("Authorization", `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(status)
        .expect(200)
        .then((res) => {
          expect(res.body.status);
          done();
        })
        .catch(done);
    });
  });

  describe("Error Operation", () => {
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
            status: "open_for_bid",
          });
          done()
        })
    });


    afterAll(async () => {
      await productsModel.destroy({ where: { id: product.id } });
    });

    it("response 404", (done) => {
      const status = {
        status: 'sold'
      };
      request(app)
        .put(`/api/v1/products/-100/status`)
        .set("Authorization", `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(status)
        .expect(404)
        .then((res) => {
          expect(res.body.message).toEqual("Product Not Found");
          done();
        })
        .catch(done);
    });

  })

});
