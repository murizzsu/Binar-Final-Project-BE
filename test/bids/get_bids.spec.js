const get_bids = require("../../controllers/bids/get_bids");
const { Bids } = require("../../models");
const express = require("express");
const request = require("supertest");
const authenticator = require("../../controllers/middleware/authenticator");
const login = require("../../controllers/user/login");

jest.setTimeout(20000);
const app = express();
app.use(express.json());
app.get("/api/v1/bids", authenticator, get_bids);
app.post("/api/v1/login", login);
let bids;


describe("Get /api/v1/bids", () => {
  const bidsModel = Bids;

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

          bids = await bidsModel.create({
            product_id: 1,
            user_id: 2,
            request_price: 15000,
            status: "pending"
          });
          done();
        });
    });


    afterAll(
      async () => await bidsModel.destroy({ where: { id: bids.id } })
    );

    it("Response 200", (done) => {
      request(app)
        .get(`/api/v1/bids`)
        .set("Authorization", `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(200)
        .then(() => {
          expect.objectContaining({
            product_id: bids.product_id,
            user_id: bids.user_id,
            request_price: bids.request_price,
            status: bids.status,
          });
          done()
        }).catch(done)

    });
  });

  describe("error", () => {

  });
});
