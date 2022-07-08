const { Error4xx, Error500 } = require('../../helpers/response/error')
const { Success200 } = require('../../helpers/response/success')
const { Bids, Products } = require('../../models')
const { REJECTED_BIDS, ACCEPTED_BIDS, WAITING_FOR_BID_PRODUCT } = require('../../helpers/database/enums')

const UpdateStatusBid = async (req, res) => {
    try{
        const { bidsId } = req.params
        const { status } = req.body
        const { userId } = req.user

        if (status === REJECTED_BIDS){
            const updatedBid = await Bids.update({
                status
            }, {
                where: {
                    id: bidsId
                }
            })
            console.log(updatedBid)
            return Success200(res, "Successfully rejected bid")
        } else if (status === ACCEPTED_BIDS){
            const { productId } = req.body
            const product = await Products.findOne({
                where: {
                    id: productId
                }
            })

            if (product.user_id !== userId){
                return Error4xx(res, 403, "You are not allowed to update this product")
            }

            const updatedProduct = await Products.update({
                status: WAITING_FOR_BID_PRODUCT,
            }, {
                where: {
                    id: productId
                }
            })
            console.log(updatedProduct)
            return Success200(res, "Successfully update status product")
        }

    } catch(err){
        Error500(res, err.message)
    }
}

module.exports = UpdateStatusBid

