const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const profil = require("../../controllers/user/profil");
const authenticator = require("../../controllers/middleware/authenticator");
const express = require("express");
const request = require("supertest");

jest.setTimeout(20000);
const app = express();
app.use(express.json())
app.put("/api/v1/profil", authenticator, profil)

describe("User Put /api/v1/profil", () => {
    describe("Put success", () => {
        beforeAll(() => {

        })

        afterAll(() => {

        })

        it("Put user", async () => {
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
            let user2 = {
                id: User.id,
                email: User.email,
                name: User.name,
                city: User.city,
                address: User.address,
                phone: User.phone,
                img_url: User.img_url,
            }
            const response = await request(app)
                .put("/api/v1/profil")
                .set("Content-Type", "application/json")
                .set("authorization", `Bearer ${token}`)
                .send(user2)
                .expect(200)
            expect(response.body).toEqual("Successfully updating profile");
        })
    })

    describe("Put unsuccess", () => {

    })


})