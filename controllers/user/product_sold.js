const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function soldProduct(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");
    
        const productsList = await Products.findAll({
          where: { user_id: user.id, sold: true },
        });
    
        if (productsList.length > 0) {
          res.status(200).send(productsList);
        } else {
          res.json({ message: "Belum ada barang yang terjual" });
        }
      } catch (err) {
        res.json({
          message: err,
        });
      }
    }

module.exports = soldProduct;

