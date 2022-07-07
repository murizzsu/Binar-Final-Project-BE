const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

async function currentUser(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user1 = jwt.verify(header, "s3cr3t");
    // let user1 = req.user1;

    // if (user1) {
    //   res.status(200).json({
    //     id: user1.id,
    //     name: user1.name,
    //     city: user1.city,
    //     address: user1.address,
    //     phone: user1.phone,
    //   });
    // } else {
    //   res.send("Anda harus login dulu");
    // }

    let user2 = await Users.findOne({
      where: { id: user1.id}
    });

    if (user2) {
      res.status(200).json({
        name: user2.name,
        city: user2.city,
        address: user2.address,
        phone: user2.phone,
        image_id: user2.image_id
      });
    } else {
      res.send("Anda harus login dulu");
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports = currentUser;
