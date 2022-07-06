const { Users } = require("../../models");
const encryptFunction = require("../encrypt-decrypt/encrypt_pass");

async function register(req, res) {
  try {
    let nameInput = req.body.name;
    let emailInput = req.body.email;
    let passwordInput = await encryptFunction(req.body.password);
    
    let user = await Users.create({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      message: `Email kamu berhasil terdaftar`
    });
  } catch (err) {
    res.send(err);
  }

}

module.exports = register;
