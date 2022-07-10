const { Products } = require("../../models");
const jwt = require("jsonwebtoken");
const { SOLD_PRODUCT } = require("../../helpers/database/enums");
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");

async function soldProduct(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");
    
        const productsList = await Products.findAll({
          where: { user_id: user.id, status: SOLD_PRODUCT },
        });
        return Success200(res, productsList)
      } catch (err) {
        return Error500(res, err.message)
      }
    }

module.exports = soldProduct;

