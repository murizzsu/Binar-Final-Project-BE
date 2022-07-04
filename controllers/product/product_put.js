const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function productPut(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user = jwt.verify(header, "s3cr3t");
    const idInput = req.params.id;
    const product = await Products.findByPk(idInput);

    if (product.user_id == user.id) {
      if (product) {
        let data = {
          category_id: product.category_id,
          name: product.name,
          price: product.price,
          description: product.description,
          // img_url: product.img_url
        };
        data = Object.assign(data, req.body);

        const productUpdate = await Products.update(data, {
          where: { id: idInput },
        });

        if (productUpdate) {
          res.json({ message: `Product dengan ${data.name} berhasil diperbarui` });
        } else {
          res.json({ message: `Product dengan ${data.name} tidak berhasil diperbarui` });
        }
      } else {
        res.json({ message: "Product tidak ditemukan" });
      }
    } else {
      res.json({
        message: "Product tidak dapat diperbarui karena Anda bukan pemiliknya",
      });
    }
  } catch (err) {
    res.send(err);
  }
}
module.exports = productPut;




