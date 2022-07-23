
const { Op } = require('sequelize');
const { ACCEPTED_BIDS, REJECTED_BIDS } = require('../../helpers/database/enums');
const { Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const { Bids, } = require('../../models');

const CheckBids = async (req, res) => {
    try{    
        const { id: userId } = req.user;
        const { productId } = req.body;

        const bidsCount = await Bids.count({
            where: {
                user_id: userId,
                product_id: productId,
                status: {
                    [Op.not]: [ACCEPTED_BIDS, REJECTED_BIDS]
                }
            }
        });
        console.log(bidsCount);
        return Success200(res, bidsCount);

    } catch(err){
        console.log(err);
        return Error500(res, err.message);
    }
};

module.exports = CheckBids;
