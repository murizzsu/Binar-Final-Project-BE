const { Products } = require("../models")

async function productGet(req, res) {
    try {
        let listProducts = await Products.findAll({ where: { sold: false } });
        res.send(listProducts);
      } catch (err) {
        res.send(err)
      }
    }

module.exports = productGet;  