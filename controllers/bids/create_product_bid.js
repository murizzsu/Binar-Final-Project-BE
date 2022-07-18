const { Error4xx, Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const { Bids, Products } = require('../../models');
const { PENDING_BIDS } = require('../../helpers/database/enums');

// TODO check if the bid larger than the original price
const CreateProductBid = async (req, res) => {
    try{
        const { productId } = req.params;
        const { id: userId } = req.user;
        const { request_price } = req.body;

        const product = await Products.findOne({
            where: {
                id: productId
            }
        });
    
        if (product.user_id === userId){
            return Error4xx(res, 400, "You are not allowed to bid your own price");
        }
        
        if(request_price >= product.price) {
            return Error4xx(res, 400, "You are not allowed to bid higher than original price");
        }

        const newProductBid = await Bids.create({
            product_id: productId,
            user_id: userId,
            request_price: request_price,
            status: PENDING_BIDS
        });
    
        return Success200(res, newProductBid);
    } catch(err){
        console.log(err);
        Error500(res, err.message);
    }
};

module.exports = CreateProductBid;

