const { Error4xx, Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const sequelize = require('sequelize');
const { Bids, Products, Categories, Users, Images } = require('../../models');
const { WAITING_FOR_NEGOTIATION_BIDS, PENDING_BIDS } = require('../../helpers/database/enums');

const NewResponseProductBids = (product) => {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        status: product.status,
        category: {
            categoryId: product.category.id,
            categoryName: product.category.name,
        },
        bids: product.bids?.map(bid => ({
            id: bid.id,
            request_price: bid.request_price,
            status: bid.status,
            user: {
                id: bid.user.id,
                name: bid.user.name,
                city: bid.user.city,
                address: bid.user.address,
                phone: bid.user.phone,
                image: bid.user.image_url,
            },
            createdAt: bid.createdAt
        })),
        images: product.images?.map(image => ({
            id: image.id,
            name: image.name
        }))
    };
    
};

/**
 * {
 *      id: 1,
 *      ownerId: 1,
 *      name: "sepatu",
 *      price: "123000",
 *      description: "sepatu murah",
 *      status: "open_for_bid",
 *      category: {
 *          categoryId: 1,
 *          categoryName: "aksesoris"
 *      },
 *      bids: [
 *          {
 *              id: 1,
 *              request_price: 100000,
 *              status: "requested",
 *              user: {
 *                  id: 1,
 *                  name: "kelvin",
 *                  image: {
 *                      id: 1,
 *                      path: "https://"
 *                  }
 *              }
 *          }
 *      ]
 * 
 * }
 * 
 */

const GetProductBid = async (req, res) => {
    try{
        const { productId } = req.params;
        const currentUser = req.user;

        const product = await Products.findOne({
            where: {
                id: productId,
            },
            include: [
                {
                    model: Bids,
                    as: 'bids',
                    include: {
                        model: Users,
                        as: 'user',
                    },
                }, {
                    model: Categories,
                    as: 'category'
                }, {
                    model: Images,
                    as: 'images'
                }
            ],
            order: sequelize.literal(`(
                CASE 
                WHEN "bids"."status" = ${ACCEPTED_BIDS} THEN 1 
                WHEN "bids"."status" = ${WAITING_FOR_NEGOTIATION_BIDS} THEN 2 
                WHEN "bids"."status" = ${PENDING_BIDS}  THEN 3
                ELSE 4 END
            ) ASC`)
        });

        if (product.user_id !== currentUser.id){
            return Error4xx(res, 403, "You are not the owner of this product");
        }


        return Success200(res, NewResponseProductBids(product));

    } catch(err){
        console.log(err);
        return Error500(res, err.message);
    }
};

module.exports = GetProductBid;
