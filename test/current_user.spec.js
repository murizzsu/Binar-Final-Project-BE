const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const current_user = require("../controllers/user/current_user");
const authenticator = require("../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.get("/api/v1/currentuser", authenticator, current_user)

describe("User GET /api/v1/currentuser", () => {
    describe("Get success", () => {
        beforeAll(() => {

        })

        afterAll(() => {

        })
        
        it("Get user", async () => {
            const user = await Users.findOne({
                where: { email: "rizky@gmail.com" },
            });
            
            let User = {
                id: user.id,
                email: user.email,
                name: user.name,
                city: user.city,
                address: user.address,
                phone: user.phone,
                img_url: user.img_url,
            };

            let token = jwt.sign(User, "s3cr3t");
            let user2 = await Users.findOne({
                where: { id: user.id}
            })

            const response = await request(app)
                .get("/api/v1/currentuser")
                .set("Content-Type", "application/json")
                .set("authorization", `Bearer ${token}`)
                .send(user2)
                .expect(200)
        expect(response.body).toBeTruthy();
        })
    })

    describe("Get unsuccess", () => {
        
    })


})