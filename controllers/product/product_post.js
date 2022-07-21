const { Products } = require("../../models");
const { Success200 } = require("../../helpers/response/success");
const { Error500, Error4xx } = require("../../helpers/response/error");

async function productPost(req, res) {
    try {
        const { id:userId } = req.user

        const productCount = await Products.count({
            where: {
                user_id: userId
            }
        })

        if (productCount >= 4){
            return Error4xx(res, 409, "You have posted max products")
        }

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