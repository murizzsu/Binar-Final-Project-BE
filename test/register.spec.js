const register = require("../controllers/user/register");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();    
app.use(express.json())
app.post("/api/v1/register", register)

describe("test register", () => {
    describe("Register success", () => {
        it("Register success", (done) => {
            const newUser = {
                name: "Dhani",
                email: "dhani@gmail.com",
                password: "12345",
            };

            request(app)
                .post("/api/v1/register")
                .set("Content-Type", "application/json")
                .send(newUser)
                .expect(201)
                .then((res) => {
                    expect(res.body).toBeTruthy();
                    done()
                })
                .catch(done);
        })
    })
})  
    