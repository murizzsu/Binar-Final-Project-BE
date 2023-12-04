const product_post = require("../../controllers/product/product_post");
const authenticator = require("../../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");
const login = require("../../controllers/user/login");

jest.setTimeout(20000);
const app = express();
app.use(express.json());
app.post("/api/v1/products", authenticator, product_post);
app.post("/api/v1/login", login);

describe("Post /api/v1/products", () => {
  describe("Success Response", () => {
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
          done();
        });
    });

    afterAll(() => {});

    it("Response", (done) => {
      let productCount = 1;
      let productInput = {
        user_id: 1,
        category_id: "DataTypes.INTEGER",
        name: "DataTypes.STRING",
        price: 150000,
        description: "req.body.description",
      };
      
      request(app)
        .post("/api/v1/products")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(productInput)
        .then((res) => {
          expect(res.status);
          console.log("status", res.status);
          console.log(productInput)
          done();
        })
        .catch(done);
    });
  });
});
