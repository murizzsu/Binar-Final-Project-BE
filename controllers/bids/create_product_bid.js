const { Error4xx, Error500 } = require('../../helpers/response/error')
const { Success200 } = require('../../helpers/response/success')
const { Bids, Products } = require('../../models')
const { OPEN_FOR_BID_PRODUCT } = require('../../helpers/database/enums')

const CreateProductBid = async (req, res) => {
    try{
        const { productId } = req.params
        const { userId } = req.user
        const { requestPrice } = req.body
    
        const product = await Products.findOne({
            where: {
                id: productId
            }
        })
    
        if (product.user_id === userId){
            return Error4xx(res, 400, "You are not allowed to bid your own price")
        }
    
        const newProductBid = await Bids.create({
            productId,
            userId,
            requestPrice,
            status: OPEN_FOR_BID_PRODUCT
        })
    
        return Success200(res, newProductBid)
    } catch(err){
        Error500(res, err.message)
    }
}

module.exports = CreateProductBid

