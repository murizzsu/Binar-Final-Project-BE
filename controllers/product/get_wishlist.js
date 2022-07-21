const { Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const { Products, Categories, Images } = require('../../models');
const { PENDING_BIDS, WAITING_FOR_NEGOTIATION_BIDS, OPEN_FOR_BID_PRODUCT } = require('../../helpers/database/enums');
const db = require('../../models');

const NewResponseGetWishlist = (products) => (
    products.map(product => ({
        id: product.id,
        category: {
            id: product.category.id,
            name: product.category.name,
        },
        name: product.name,
        price: product.price,
        description: product.description,
        status: product.status,
        images: product.images.map(image => ({
            id: image.id,
            name: image.name
        }))
    }))
);

const GetWishlist = async (req, res) => {
    try{
        const { id: userId } = req.user;
    
        let productIds = await db.sequelize.query('SELECT DISTINCT("product_id") FROM "bids" WHERE "bids"."status" IN (:bidsStatus)', {
            replacements: {bidsStatus: [PENDING_BIDS, WAITING_FOR_NEGOTIATION_BIDS]},
            type: db.sequelize.QueryTypes.SELECT
        });

        productIds = productIds.map(productId => productId.product_id);
    
        const products = await Products.findAll({
            where: {
                id: productIds,
                user_id: userId,
                status: OPEN_FOR_BID_PRODUCT,
            },
            include: [
                {
                    model: Images,
                    as: 'images'
                }, {
                    model: Categories,
                    as: 'category',
                }
            ]
        });
        return Success200(res, NewResponseGetWishlist(products));
    } catch(err){
        console.log(err);
        return Error500(res, err.message);
    }

};

module.exports = GetWishlist;


