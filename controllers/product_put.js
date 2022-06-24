const { Products } = require("../models");
const jwt = require("jsonwebtoken");

async function productPut(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user = jwt.verify(header, "s3cr3t");
    const idInput = req.params.id;

    const product = await Products.findByPk(idInput);

    if (product.user_id == user.id) {
      if (product) {
        let productData = {
          category_id: product.category_id,
          name: product.name,
          price: product.price,
          description: product.description,
          img_url: product.img_url
        };
        productData = Object.assign(productData, req.body);

        const updateProduct = await Products.update(productData, {
          where: { id: idInput },
        });

        if (updateProduct) {
          res.status(201).json({
            category_id: req.body.category_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            img_url: req.body.img_url,
          });
        } else {
          res.json({ message: "invalid" });
        }
      } else {
        res.json({ message: "invalid" });
      }
    } else {
      res.status(403).json({
        message: "invalid",
      });
    }
  } catch (err) {
    res.send(err);
  }
}
module.exports = productPut;




