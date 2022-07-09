const { Error4xx, Error500 } = require('../../helpers/response/error')
const { Success200 } = require('../../helpers/response/success')
const { Products } = require('../../models')
const { OPEN_FOR_BID, WAITING_FOR_BID_PRODUCT, SOLD_PRODUCT } = require('../../helpers/database/enums')

const UpdateProductStatus = async (req, res) => {
    try{
        const { productId } = req.params
        const { status } = req.body 

        const product = await Products.findOne({
            where: {
                id: productId
            }
        })

        if (product){
            const whiteListStatus = [OPEN_FOR_BID, WAITING_FOR_BID_PRODUCT, SOLD_PRODUCT]

            if (whiteListStatus.includes(status)){
                if (product.status !== SOLD_PRODUCT){
                    const updatedProduct = await Products.update({
                        status
                    }, {
                        where: {
                            id: productId,
                        }
                    })
    
                    console.log(updatedProduct)
                    return Success200(res, updatedProduct)
                }
                return Error4xx(res, 400, "BadRequest")
            } 
            return Error4xx(res, 400, "BadRequest")

        } 
        return Error4xx(res, 404, "Product Not Found")

    } catch(err){
        console.log(err)
        return Error500(res, err.message)
    }
}

module.exports = UpdateProductStatus
