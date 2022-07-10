const { Products } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error4xx, Error500 } = require("../../helpers/response/error");

async function productDelete(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");
        const idInput = req.params.id;
        const check = await Products.findByPk(idInput);
        console.log(check);
        if (check) {
            if (check.user_id == user.id) {
                await Products.destroy({ where: { id: idInput}});
                return Success200(res, "Successfully deleted")
            } else {
                return Error4xx(res, 403, "You are not the owner of this product")
            }
        } else {
            return Error4xx(res, 404, "Product not found")
        }
    } catch (err) {
        return Error500(res, err.message)
    }
}

module.exports = productDelete;
