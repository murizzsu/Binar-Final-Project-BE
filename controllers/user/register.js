const { Users } = require("../../models");
const encryptFunction = require("../encrypt-decrypt/encrypt_pass");

async function register(req, res) {
  try {
    let nameInput = req.body.name;
    console.log(req.body);
    let emailInput = req.body.email;
    let passwordInput = await encryptFunction(req.body.password);
    // let imgInput = req.body.img_url;
    // let cityInput = req.body.city;
    // let addressInput = req.body.address;
    // let phoneInput = req.body.phone;
    
    let user = await Users.create({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
      // img_url: imgInput,
      // city: cityInput,
      // address: addressInput,
      // phone: phoneInput
    });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    });
  } catch (error) {
    // console.log(error)
    res.send(error);
  }

}

module.exports = register;
