const { Products } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error4xx, Error500 } = require("../../helpers/response/error");

async function productPut(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user = jwt.verify(header, "s3cr3t");

    let { id: userId } = req.user;
    const { id: idInput } = req.params;
    const product = await Products.findOne({
      where: {
        id: idInput
      }
    });

    if (product) {
      if (product.user_id == userId) {
        let data = {
          category_id: product.category_id,
          name: product.name,
          price: product.price,
          description: product.description,
        };
        data = Object.assign(data, req.body);

        const productUpdate = await Products.update(data, {
          where: { id: idInput },
        });

        return Success200(res, "Successfully updated product");
      }
      return Error4xx(res, 403, "You are not the owner of this product");
    }
    return Error4xx(res, 404, "Product not found");
  } catch (err) {
    return Error500(res, err.message);
  }
}
module.exports = productPut;




