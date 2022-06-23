const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const decryptPass = require("./decrypt_pass");

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
      let checkPassword = await decryptPass(
        validation.password,
        req.body.password
      );
      if (req.body.email === validation.email && checkPassword) {
        let user = {
          id: validation.id,
          email: validation.email,
        };
        let token = jwt.sign(user, "s3cr3t");
        res.status(200).json({
          token: token,
        });
        return;
      } else {
        res.send("invalid");
      }
    } else {
      res.send("invalid");
    }
  } catch (err) {
    res.send(err);
  }

}

module.exports = login;
