const { Error4xx, Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const sequelize = require('sequelize');
const { Bids, Products, Categories, Users, Images } = require('../../models');
const { PENDING_BIDS, REJECTED_BIDS, ACCEPTED_BIDS, WAITING_FOR_NEGOTIATION_BIDS } = require('../../helpers/database/enums');

const GetBids = async (req, res) => {
    try{
        const { id: userId } = req.user;
        let queryBids = {};
        let queryProduct = {
            user_id: userId
        };
        let queryUser = {};
        
        let orderBids = [['id', 'ASC']];

        const whiteListStatusBids = [PENDING_BIDS, WAITING_FOR_NEGOTIATION_BIDS, REJECTED_BIDS, ACCEPTED_BIDS];
        const { productId, statusBid, orderBy } = req.query;

        if (productId){
            queryProduct = { ...queryProduct, id: productId};
        }

        if (whiteListStatusBids.includes(statusBid)){
            queryBids = { ...queryBids, status: statusBid };
        }
        if (orderBy === "bids"){
            orderBids = sequelize.literal(`(
                CASE 
                WHEN "bids"."status" = 'accepted' THEN 1 
                WHEN "bids"."status" = 'pending'  THEN 2 
                ELSE 3 END
            ) ASC`);
        }

        const bids = await Bids.findAll({
            where: queryBids,
            include: [
                {
                    model: Products,
                    where: queryProduct,
                    as: 'product',
                    include: [
                        {
                            model: Users,
                            as: 'user'
                        }, {
                            model: Images,
                            as: 'images'
                        }
                    ]
                },{
                    model: Users,
                    where: queryUser,
                    as: 'user',
                }
            ],
            order: orderBids,
        });

        return Success200(res, bids);

    } catch(err){
        console.log(err);
        return Error500(res, err.message);
    }
};

module.exports = GetBids;
