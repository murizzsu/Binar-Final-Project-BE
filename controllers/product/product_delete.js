const { Products } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error4xx, Error500 } = require("../../helpers/response/error");

async function productDelete(req, res) {
    try {
        const { id: userId } = req.user;
        const { id: productId } = req.params.id;
        const product = await Products.findOne({
            where: {
                id: idInput
            }    
        });


        if (product) {
            if (product.user_id == userId) {
                await Products.destroy({ where: { id: productId } });
                return Success200(res, "Successfully deleted");
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
