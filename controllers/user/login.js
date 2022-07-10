const jwt = require("jsonwebtoken");
const { Error4xx, Error500 } = require("../../helpers/response/error");
const { Success200 } = require("../../helpers/response/success");
const { Users } = require("../../models");
const decryptFunction = require("../encrypt-decrypt/decrypt_pass");

async function login(req, res) {
  try {
    let check = await Users.findOne({
      where: { email: req.body.email },
    });
    
    if (check) {
      let idGenerator = check.id;
      let validation = await Users.findOne({
        where: { id: idGenerator },
      });
      let checkPassword = await decryptFunction(
        validation.password,
        req.body.password
      );
      if (req.body.email === validation.email && checkPassword) {
        let user = {
          id: validation.id, 
          email: validation.email,
          name: validation.name,
          city: validation.city,
          address: validation.address,
          phone: validation.phone
        };
        let token = jwt.sign(user, "s3cr3t");
        return Success200(res, {
          user,
          token
        })
      } 
      return Error4xx(res, 401, "Email or Password doesn't match")
    }
    return Error4xx(res, 401, "Email or Password doesn't match")
  } catch (err) {
    return Error500(res, err.message)
  }

}

module.exports = login;
