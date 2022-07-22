// const { Notifications } = require("../../models");
// const notification = require("../../controllers/user/update_notification");
// const authenticator = require("../../controllers/middleware/authenticator");
// const express = require("express");
// const request = require("supertest");
// const login = require("../../controllers/user/login");

// jest.setTimeout(30000);
// const app = express();
// app.use(express.json());
// app.get("/api/v1/notification", authenticator, notification);
// app.post("/api/v1/login", login);

// describe("Get /api/v1/notification", () => {
//   const notificationModel = Notifications;
//   describe("Successfull Operation", () => {
//     let token;
//     const userCredential = {
//       email: "rizky@gmail.com",
//       password: "12345",
//     };

//     let notifications;
//     beforeAll((done) => {
//       request(app)
//         .post("/api/v1/login")
//         .send(userCredential)
//         .end(async (err, res) => {
//           if (err) return done(err);
//           expect(res.header["content-type"]).toMatch(/json/);
//           expect(res.status).toEqual(200);
//           token = res.body.token;

//           notifications = await notificationModel.findAll({
//             where: {
//               user_id: 1,
//             },
//           });
//         });
//       done();
//     });

//     it("valid request", (done) => {
//         request(app)
//         .get('/api/v1/notification')
//         .set('Accept', 'application/json')
//         .set("Authorization",`Bearer ${token}`)
//         .expect("Content-type", /json/)
//         .end((err, res) => {
//             if (err) return done(err)

//             expect(res.header['content-type']).toMatch(/json/)
//             expect(res.status).toEqual(200)
//             expect(res.body).toEqual(notifications)
//             done()
//         })
//     });
//   });
// });
