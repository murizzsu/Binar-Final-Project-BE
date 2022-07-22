const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error500, Error4xx } = require("../../helpers/response/error");

async function profil(req, res) {
  try {
    const { id:userId } = req.user;
    let check = await Users.findByPk(userId);

    if (check) {
      const { name, city, address, phone } = req.body;

      await Users.update(
        {
          name,
          city,
          address,
          phone,
        },
        {
          where: { id: userId },
        }
      );
      return Success200(res, "Successfully updating profile");
    }
    return Error4xx(res, 404, "User Not Found");
  } catch (err) {
    return Error500(res, err.message);
  }
}

module.exports = profil;
