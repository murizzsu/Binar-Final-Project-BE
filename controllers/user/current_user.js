const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error4xx, Error500 } = require("../../helpers/response/error");

async function currentUser(req, res) {
  try {
    const { id:userId } = req.user
    
    let user2 = await Users.findOne({
      where: { id: userId }
    });

    if (user2) {
      return Success200(res, {
        id: user2.id,
        name: user2.name,
        city: user2.city,
        address: user2.address,
        phone: user2.phone,
        image_url: user2.image_url
      });
    } 
    return Error4xx(res, 401, "You are unauthorized");
  } catch (err) {
    console.log(err);
    return Error500(res, err.message);
  }
}

module.exports = currentUser;
