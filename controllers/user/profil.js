const { Users, Images } = require("../../models");
const jwt = require("jsonwebtoken");

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
      res.send({
        message: "Profil berhasil diperbarui",
      });
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports = profil;
