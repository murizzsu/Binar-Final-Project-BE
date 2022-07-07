const jwt = require("jsonwebtoken");

async function currentUser(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user = jwt.verify(header, "s3cr3t");
    
    if (user) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        city: user.city,
        address: user.address,
        phone: user.phone,
      });
    } else {
      res.send("Anda harus login dulu");
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports = currentUser;
