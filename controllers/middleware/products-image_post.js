const { PRODUCT_STORAGE } = require('../../config/cloudinaryStorage');
const { Error4xx, Error500 } = require('../../helpers/response/error')
const { Images, Products } = require('../../models')
const { removeManyFilesInCloudinary } = require('../../helpers/cloudinary/destroy');
const { Success200 } = require('../../helpers/response/success');

const NewResponseProductImages = (images) => {
    images = images.map(image => ({
        name: image.name,
        product_id: image.product_id,
    }))

    return images
}

/**
 *  [
 *     {
 *         "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657386242/binar-final-project/products/ljmlbbqiantzyknxwybq.jpg",
 *         "product_id": 1
 *     },
 *     {
 *         "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657386245/binar-final-project/products/kthzbaeoau9qclafro9c.jpg",
 *         "product_id": 1
 *     },
 *     {
 *         "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657386244/binar-final-project/products/h9w14ft1grqdk5cqymcd.jpg",
 *         "product_id": 1
 *     },
 *     {
 *         "name": "https://res.cloudinary.com/djann8mt5/image/upload/v1657386245/binar-final-project/products/nvnjak6dkv0zqldhvaqp.jpg",
 *         "product_id": 1
 *     }
 *  ]
 */
async function productsImagePost(req, res) {
    try {
        const { productId } = req.body

        const images = req.files?.map(file => ({
            name: file.path,
            product_id: Number(productId)
        }))

        const product = await Products.findOne({
            where: {
                id: productId,
            },
            include: {
                model: Images,
                as: 'images'
            }
        })
        
        if (product){
            const insertedImages = product.images
            await removeManyFilesInCloudinary(PRODUCT_STORAGE, insertedImages)
            
            await Images.destroy({
                where: {
                    product_id: productId,
                }
            })

            const imageCreated = await Images.bulkCreate(images)
            return Success200(res, NewResponseProductImages(imageCreated))
        }
        return Error4xx(res, 404, "Product not found")

        
    } catch (err) {
        return Error500(res, err.message)
    }
}

module.exports = productsImagePost;