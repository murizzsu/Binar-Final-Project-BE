const jwt = require("jsonwebtoken");
const { Error4xx, Error500 } = require("../../helpers/response/error");
const { Success200 } = require("../../helpers/response/success");
const { Users } = require("../../models");
const decryptFunction = require("../encrypt-decrypt/decrypt_pass");

async function login(req, res) {
  try {
    if (!req.body.email || !req.body.password){
      return Error4xx(res, 400, "Bad Request");
    }

    let user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      let isPasswordCorrect = await decryptFunction(
        user.password,
        req.body.password
      );

      if (isPasswordCorrect) {
        let payload = {
          id: user.id, 
          email: user.email,
          name: user.name,
          city: user.city,
          address: user.address,
          phone: user.phone
        };
        let token = jwt.sign(payload, "s3cr3t");
        return Success200(res, {
          user: payload,
          token
        });
      } 
      return Error4xx(res, 401, "Email or Password doesn't match");
    }
    return Error4xx(res, 404, "You are not registered yet");
  } catch (err) {
    console.log(err);
    return Error500(res, err.message);

  }
}

module.exports = login;

