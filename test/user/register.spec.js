const register = require("../../controllers/user/register");
const express = require("express");
const request = require("supertest");
const { Users } = require("../../models");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.post("/api/v1/register", register)

const newUser = {
    name: "Wafi",
    email: "wafi@gmail.com",
    password: "12345",
}

const registeredUser = {
    name: "Rizky",
    email: "rizky@gmail.com",
    password: "12345"
}
describe("Register POST /api/v1/register", () => {
    describe("Register success", () => {
        beforeAll(async () => {
            await Users.create(registeredUser);
        })

        afterAll(async () => {
            await Users.destroy({
                where: {
                  name: newUser.name,
                  email: newUser.email,
                },
              });
        
        })

        it("Return status code 200, get data", (done) => {

            request(app)
            .post("/api/v1/register")
            .set("Content-Type", "application/json")
            .send(newUser)
            .expect(200)
            .then((res) => {
              expect(res.body).toBeTruthy();
              done();
            })
            .catch(done);

        })
    })
    describe("Register unsuccess", () => {

        it("User Already Exist", (done) => {

            request(app)
            .post("/api/v1/register")
            .set("Content-Type", "application/json")
            .send(registeredUser)
            .expect(400)
            .then((res) => {
              expect(res.body.message).toBe("User Already Exist");
              done();
            })
            .catch(done);
        })
    })
})
