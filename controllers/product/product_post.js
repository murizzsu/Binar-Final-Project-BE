const { Products, Images } = require("../../models");
const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");

async function productPost(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");

        let productInput = {
            user_id: user.id,
            category_id: req.body.category_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        };

        const Product = await Products.create(productInput);

        return Success200(res, Product);


    } catch (err) {
        return Error500(res, err.message);
    }
}


module.exports = productPost;