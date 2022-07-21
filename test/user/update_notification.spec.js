const { Notifications } = require("../../models");
const notification = require("../../controllers/user/update_notification");
const authenticator = require("../../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");
const login = require("../../controllers/user/login");

jest.setTimeout(30000);
const app = express();
app.use(express.json());
app.put("/api/v1/notification/:id", authenticator, notification);
app.post("/api/v1/login",login)
let notif
describe("PUT /api/v1/notification/:id", () => {
  const notificationModel = Notifications;

  describe("Successfull Operation", () => {
    let token;
    const userCredential = {
        email:"rizky@gmail.com",
        password:"12345"
    }

    beforeAll((done) => {
        request(app)
        .post('/api/v1/login')
        .send(userCredential)
        .end(async(err,res)=>{
            if(err) return done(err)
            expect(res.header['content-type']).toMatch(/json/)
            expect(res.status).toEqual(200)
            token = res.body.token

            notif = await notificationModel.create({
              user_id: 1,
              product_id: 1,
              bid_id: 1,
              title: "DataTypes.STRING",
              message: "DataTypes.STRING",
              read: false,
            });
            done()
        })
    });

    afterAll(async () => {
      await notificationModel.destroy({ where: { id: notif.id } });
    });

    it("response 200", (done) => {
      request(app)
        .put(`/api/v1/notification/${notif.id}`)
        .set("Authorization",`Bearer ${token}`)
        .set('Accept','application/json')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual("Successfull Update Notification");
          done();
        })
        .catch(done);
    });
  });

  describe("Error Operation",()=>{
    let validToken
    const validUserCredential = {
        email:"rizky@gmail.com",
        password:"12345"
    }
    let invalidToken
    const invalidUserCredential = {
        email: "dhani@gmail.com",
        password: "12345"
    }
    
    
    beforeAll((done)=>{
        request(app)
        .post('/api/v1/login')
        .send(validUserCredential)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.header['content-type']).toMatch(/json/)
            expect(res.status).toEqual(200)
            validToken = res.body.token

            request(app)
        .post('/api/v1/login')
        .send(invalidUserCredential)
        .end(async(err,res)=>{
            if(err) return done(err)
            expect(res.header['content-type']).toMatch(/json/)
            expect(res.status).toEqual(200)
            invalidToken = res.body.token
        
        const notifDetail = {
            user_id: 1,
            product_id: 1,
            bid_id: 1,
            title: "DataTypes.STRING",
            message: "DataTypes.STRING",
            read: false,
            };

            notif = await notificationModel.create(notifDetail)
            done()
        })   
        })
    })

    
    afterAll(async () => {
        await notificationModel.destroy({ where: { id: notif.id } });
      });

    it("response 400", (done) => {
        request(app)
          .put(`/api/v1/notification/${notif.id}`)
          .set("Authorization",`Bearer ${invalidToken}`)
          .set('Accept','application/json')
          .expect(400)
          .then((res) => {
            expect(res.body.message).toEqual("BadRequest");
            done();
          })
          .catch(done);
      });
  })
});


