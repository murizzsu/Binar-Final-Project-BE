const { Notifications } = require("../../models");
const notification = require("../../controllers/user/notification");
const authenticator = require("../../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");
const login = require("../../controllers/user/login");


jest.setTimeout(30000);
const app = express();
app.use(express.json());
app.get("/api/v1/notification", authenticator, notification);
app.post("/api/v1/login", login);
let notif;
describe("Get /api/v1/notification", () => {
  const notificationModel = Notifications;

  describe("Successfull Response", () => {
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

          notif = await notificationModel.create({
            user_id: 1,
            product_id: 1,
            bid_id: 1,
            title: "DataTypes.STRING",
            message: "DataTypes.STRING",
            read: false,
          });
          done();
        });
    });
    
    afterAll(async () => {
      await notificationModel.destroy({ where: { id: notif.id } });
    });

    console.log(notif)
    it("response 200", (done) => {
      request(app)
        .get(`/api/v1/notification`)
        .set("Authorization",`Bearer ${token}`)
        .set('Accept','application/json')
        .expect(200)
        .then(() => {
          expect.objectContaining({
            user_id: notif.user_id,
            product_id: notif.product_id,
            bid_id: notif.bid_id,
            title: notif.title,
            message: notif.message,
            read: notif.read,
          });
          done();
        })
        .catch(done);
    });
  });
});
