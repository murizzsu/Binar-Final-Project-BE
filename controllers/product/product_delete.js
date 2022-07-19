const { Products, Bids, Images } = require("../../models");
const { Success200 } = require("../../helpers/response/success");
const { Error4xx, Error500 } = require("../../helpers/response/error");
const { Op } = require("sequelize");
const { PENDING_BIDS, WAITING_FOR_NEGOTIATION_BIDS } = require("../../helpers/database/enums");
const { removeManyFilesInCloudinary } = require("../../helpers/cloudinary/destroy");
const { PRODUCT_STORAGE } = require("../../config/cloudinaryStorage");

async function productDelete(req, res) {
    try {
        const { id: userId } = req.user;
        const { id: productId } = req.params;
        const product = await Products.findOne({
            where: {
                id: productId
            }, 
            include: {
                model: Images,
                as: 'images'
            }
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
                    await Bids.destroy({
                        where: {
                            product_id: productId,
                        }
                    });

                    if (product.images){
                        await removeManyFilesInCloudinary(PRODUCT_STORAGE, product.images);
                        await Images.destroy({
                            where: {
                                product_id: productId,
                            }
                        });
                    }


                    await Products.destroy({ where: { id: productId } });
                    return Success200(res, "Successfully deleted");
                }
                return Error4xx(res,422,"Bid in progress");
            } 
            return Error4xx(res, 403, "You are not the owner of this product");
        } 
        return Error4xx(res, 404, "Product not found");
    } catch (err) {
        console.log(err);
        return Error500(res, err.message);
    }
}

module.exports = productDelete;
