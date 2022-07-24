const get_wishlist = require("../../controllers/product/get_wishlist");
const { Products } = require("../../models");
const express = require("express");
const request = require("supertest");
const authenticator = require("../../controllers/middleware/authenticator");
const login = require("../../controllers/user/login");

jest.setTimeout(20000);
const app = express();
app.use(express.json());
app.get("/api/v1/products/wishlist", authenticator, get_wishlist);
app.post("/api/v1/login", login);
let product;


describe("Get /api/v1/products/wishlist", () => {
  const productsModel = Products;

  describe("Successfull Operation", () => {
    let token;
    const userCredential = {
      email: "rizky@gmail.com",
      password: "12345",
    };

    beforeAll((done) => {
      request(app)
        .post("/api/v1/login")
        .send(userCredential)
        .end(async (err, res) => {
          if (err) return done(err);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.status).toEqual(200);
          token = res.body.token;

          product = await productsModel.create({
            user_id: 1,
            category_id: 1,
            name: "DataTypes.STRING",
            price: "DataTypes.FLOAT",
            description: "DataTypes.TEXT",
            status: "open_for_bid",
          });
          done();
        });
    });


    afterAll(
      async () => await product.destroy({ where: { id: product.id } })
    );

    it("Response 200", (done) => {
      request(app)
        .get(`/api/v1/products/wishlist`)
        .set("Authorization", `Bearer ${token}`)
        .set('Accept', 'application/json')
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
    // it("Response 404", (done) => {
    //   request(app)
    //     .get(`/api/v1/products/-100`)
    //     .expect(404)
    //     .then((res) => {
    //       expect(res.body.message).toEqual("Product Not Found");
    //       done();
    //     })
    //     .catch(done);
    // });

  });
});
