const login = require("../controllers/user/login");
const migrator = require("../migrator");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();    
app.use(express.json())
app.post("/api/v1/login", login)

describe("test login", () => {
    beforeEach(async () => {
        return migrator()
    });
    it("logged in", (done) => {
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
            expect(res.body).toBeTruthy();
            done()
        })
        .catch(done);
    })
})