const { Error4xx, Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const { Bids } = require('../../models');
const { PENDING_BIDS, REJECTED_BIDS, ACCEPTED_BIDS, WAITING_FOR_NEGOTIATION_BIDS, SOLD_PRODUCT } = require('../../helpers/database/enums');
const { Op } = require('sequelize');

const UpdateStatusBid = async (req, res) => {
    try{
        const { bidsId } = req.params;
        const { status } = req.body;
        

        const whiteListStatus = [ WAITING_FOR_NEGOTIATION_BIDS, REJECTED_BIDS, ACCEPTED_BIDS ];

        if (whiteListStatus.includes(status)){
            const bid = await Bids.findOne({
                where: {
                    id: bidsId
                }
            });

            if (!bid){
                return Error4xx(res, 404, "Bid Not Found");
            }
            if (bid.status === PENDING_BIDS){
                const updatedBid = await Bids.update({
                    status
                }, {
                    where: {
                        id: bidsId
                    }
                });
                switch (status){
                    case REJECTED_BIDS:
                        return Success200(res, "Successfully rejected bid");
                    case WAITING_FOR_NEGOTIATION_BIDS:
                        return Success200(res, "Successfully accepting bid.");
                    default:
                        return Error4xx(res, "BadRequest");
                }
            } else if (bid.status === WAITING_FOR_NEGOTIATION_BIDS){
                if (status === REJECTED_BIDS){
                    const updatedBid = await Bids.update({
                        status: REJECTED_BIDS,
                    }, {
                        where: {
                            id: bidsId,
                        }
                    })

                    return Success200(res, "Successfully rejected bid after negotiation")
                } else if (status === ACCEPTED_BIDS){
                    const [ updatedBidBid, rejectedBids, _ ] = await Promise.all([
                        Bids.update({
                            status: ACCEPTED_BIDS
                        }, {
                            where: {
                                id: bidsId,
                            }
                        }),

                        Bids.update({
                            status: REJECTED_BIDS,
                        }, {
                            where: {
                                id: {
                                    [Op.not]: bidsId,
                                }, 
                                product_id: bid.product_id,
                            }
                        }),

                        Products.update({
                            status: SOLD_PRODUCT
                        }, {
                            where: {
                                id: bid.product_id,
                            }
                        })
                    ])
                    return Success200(res, "Successfully done transaction")
                }
            }
            return Error4xx(res, 400, "BadRequest");
        } 
        return Error4xx(res, 400, "BadRequest");
    } catch(err){
        console.log(err)
        Error500(res, err.message);
    }
};

module.exports = UpdateStatusBid;

