const { Products } = require("../models");
const jwt = require("jsonwebtoken");

async function productPut(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user = jwt.verify(header, "s3cr3t");

    let product  = await Products.findBypk({
      where: { id: req.params.id},
    });

    if (product.user_id == user.id) {
      await Products.update(
        {
          id: product.id,
          category_id: product.category_id,
          name: product.name,
          price: product.price,
          description: product.description,
          img_url: product.img_url
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



