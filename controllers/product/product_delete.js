const { Products,Bids } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error4xx, Error500 } = require("../../helpers/response/error");
const { Op } = require("sequelize");
const { PENDING_BIDS, WAITING_FOR_NEGOTIATION_BIDS } = require("../../helpers/database/enums");

async function productDelete(req, res) {
    try {
        const { id: userId } = req.user;
        const { id: productId } = req.params;
        const product = await Products.findOne({
            where: {
                id: productId
            }, 
        });

        if (product) {
            if (product.user_id == userId) {
                const bid = await Bids.count({
                    where:{
                        product_id : productId,
                        status: {
                            [Op.or] : [PENDING_BIDS,WAITING_FOR_NEGOTIATION_BIDS]
                        }
                    }
                });
                
                if(bid === 0){
                    await Products.destroy({ where: { id: productId } });
                    console.log(bid);
                    return Success200(res, "Successfully deleted");
                }
                return Error4xx(res,422,"Bid in progress");
            } else {
                return Error4xx(res, 403, "You are not the owner of this product");
            }
        } else {
            return Error4xx(res, 404, "Product not found");
        }
    } catch (err) {
        return Error500(res, err.message);
    }
}

module.exports = productDelete;
