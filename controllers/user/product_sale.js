const { Products } = require("../../models");
const jwt = require("jsonwebtoken");
const { Error500 } = require("../../helpers/response/error");
const { Success200 } = require("../../helpers/response/success");
const { OPEN_FOR_BID_PRODUCT } = require("../../helpers/database/enums");

async function saleProduct(req, res) {
    // try {
    //     const { id: userId } = req.user
    
    //     let productsList = await Products.findAll({
    //       where: { user_id: userId, status: OPEN_FOR_BID_PRODUCT },
    //     });
    
    //     return Success200(res, productsList);
    //   } catch (err) {
    //     return Error500(res, err.message);
        
    //   }
}

module.exports = saleProduct;

