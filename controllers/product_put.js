const { Users } = require("../models");

async function productPut(req, res) {
  try {
    let check = await Users.findOne({
      where: { id: req.params.id, role: "product" },
    });

    if (check) {
      await Users.update(
        {
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
          address: req.body.address,
          phone_number: req.body.phone_number,
          fullname: req.body.fullname,
        },
        { where: { id: req.params.id } }
      );
      res.send("Data product berhasil diperbarui");
    } else {
      res.send("Data tidak ada");
    }
  } catch (err) {
    res.send(err);

  }
}

module.exports = productPut;



