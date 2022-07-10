const { Users, Images } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");

async function profil(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user = jwt.verify(header, "s3cr3t");
    let check = await Users.findByPk(user.id);

    if (check) {
      let cityInput = req.body.city;
      let addressInput = req.body.address;
      let phoneInput = req.body.phone;
      let imageInput = req.body.image;

      let ImageUpload = await Images.create({
        name: imageInput,
      });

      if (check.image_id) {
        await Images.destroy({ where: { id: check.image_id } });
      }

      await Users.update(
        {
          city: cityInput,
          address: addressInput,
          phone: phoneInput,
          image_id: ImageUpload.id,
        },
        {
          where: { id: user.id },
        }
      );
      return Success200(res, "Successfully updating profile")
    }
  } catch (err) {
    return Error500(res, err.message)
  }
}

module.exports = profil;
