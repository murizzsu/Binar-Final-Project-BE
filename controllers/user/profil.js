const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");

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
          where: { id: user.id },
        }
      );
      return Success200(res, "Successfully updating profile");
    }
  } catch (err) {
    return Error500(res, err.message);
  }
}

module.exports = profil;
