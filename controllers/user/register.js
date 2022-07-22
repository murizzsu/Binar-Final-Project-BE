const { Error500, Error4xx } = require("../../helpers/response/error");
const { Success200 } = require("../../helpers/response/success");
const { Users } = require("../../models");
const encryptFunction = require("../encrypt-decrypt/encrypt_pass");

async function register(req, res) {
  try {
    let nameInput = req.body.name;
    let emailInput = req.body.email;
    let passwordInput = await encryptFunction(req.body.password);
    
    let existingUser = await Users.findOne({
      where : {
        email : emailInput
      }
    }); 

    if(existingUser){
      return Error4xx(res, 409, "User Already Exist");
    }

    let user = await Users.create({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });

    return Success200(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      message: `Email kamu berhasil terdaftar`
    });
  } catch (err) {
    return Error500(res, err.message);
  }

}

module.exports = register;
