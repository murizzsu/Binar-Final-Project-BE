const register = require("../controllers/user/register");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.post("/api/v1/register", register)

describe("Register POST /api/v1/register", () => {
    describe("Register success", () => {
        beforeAll(() => {

        })

        afterAll(() => {

        })

        it("Return status code 200, get data", async () => {
            const newUser = {
                name: "Dhani",
                email: "dhani@gmail.com",
                password: "12345",
            }

            const response = await request(app)
                .post("/api/v1/register")
                .set("Content-Type", "application/json")
                .send(newUser)
                .expect(200)
            expect(response.body).toBeTruthy();
        })
    })

    describe("Register unsuccess", () => {

    })
})
