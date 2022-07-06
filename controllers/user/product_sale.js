const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function saleProduct(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");
    
        let productsList = await Products.findAll({
          where: { user_id: user.id, sold: false },
        });
    
        if (productsList) {
          if (!productsList.length == 0) {
            res.status(200).send(productsList);
          } else {
            res.send("Belum ada barang yang dijual");
          }
        } else {
          res.send("Barang tidak ditemukan");
        }
      } catch (err) {
        res.send({
          message: err,
        });
      }
}

module.exports = saleProduct;

