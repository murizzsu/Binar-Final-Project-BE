const { Products } = require("../../models");
const jwt = require("jsonwebtoken");
const { Error500 } = require("../../helpers/response/error");
const { Success200 } = require("../../helpers/response/success");
const { OPEN_FOR_BID_PRODUCT } = require("../../helpers/database/enums");

async function saleProduct(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");
    
        let productsList = await Products.findAll({
          where: { user_id: user.id, status: OPEN_FOR_BID_PRODUCT },
        });
    
        return Success200(res, productsList)
      } catch (err) {
        return Error500(res, err.message)
        
      }
}

module.exports = saleProduct;

