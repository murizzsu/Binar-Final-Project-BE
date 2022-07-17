const login = require("../controllers/user/login");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.post("/api/v1/login", login)

describe("Login POST /api/v1/login", () => {
    describe("Login success", () => {
        beforeAll(() => {

        })

        afterAll(() => {

        })

        it("Return status code 200, return user and token", (done) => {
            const validUser = {
                email: "rizky@gmail.com",
                password: "12345",
            };
            
            request(app)
                .post("/api/v1/login")
                .set("Content-Type", "application/json")
                .send(validUser)
                .expect(200)
                .then((res) => {
                    expect(res.body.token).toBeTruthy();
                    done()
                })
                .catch(done);
        })
    })

    describe("Login failed", () => {
        it("Return status code 404, You are not registered yet", (done) => {
            const invalidUser = {
                email: "dhani1@gmailcom",
                password: "invalidpass"
            }
            
            request(app)
                .post("/api/v1/login")
                .set("Content-Type", "application/json")
                .send(invalidUser)
                .expect(404)
                .then((res) => {
                    expect(res.body.message).toBe("You are not registered yet");
                    done()
                })
                .catch(done);
        })

        it("Return status code 400", (done) => {

            request(app)
                .post("/api/v1/login")
                .set("Content-Type", "application/json")
                .send({
                    email: null,
                    password: null
                })
                .expect(400)
                .then((res) => {
                    expect(res.body.message).toBe("Bad Request");
                    done()
                })
                .catch(done);
        })

    })
})
