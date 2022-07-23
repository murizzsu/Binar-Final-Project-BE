const { Error4xx, Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const { Bids, Products, Notifications } = require('../../models');
const { PENDING_BIDS, REJECTED_BIDS, ACCEPTED_BIDS, WAITING_FOR_NEGOTIATION_BIDS, SOLD_PRODUCT } = require('../../helpers/database/enums');
const { Op } = require('sequelize');

const UpdateStatusBid = async (req, res) => {
    try{
        const { bidsId } = req.params;
        const { status } = req.body;
        const { id: userId } = req.user;
        

        const whiteListStatus = [ WAITING_FOR_NEGOTIATION_BIDS, REJECTED_BIDS, ACCEPTED_BIDS ];

        if (whiteListStatus.includes(status)){
            const bid = await Bids.findOne({
                where: {
                    id: bidsId
                }, 
                include: {
                    model: Products,
                    as: 'product'
                }
            });

            if (!bid){
                return Error4xx(res, 404, "Bid Not Found");
            }
            if (bid.status === PENDING_BIDS){
                switch (status){
                    case REJECTED_BIDS:
                        await Promise.all([
                            Bids.update({
                                status: REJECTED_BIDS
                            }, {
                                where: {
                                    id: bidsId
                                }
                            }),

                            // buyer
                            Notifications.create({
                                user_id: bid.user_id,
                                product_id: bid.product.id,
                                bid_id: bidsId,
                                title: "Penawaran anda ditolak",
                                read: false,
                            }),
                
                            // seller
                            Notifications.create({
                                user_id: userId,
                                product_id: bid.product.id,
                                title: "Menolak penawaran",
                                read: false,
                            })
                        ])
                        return Success200(res, "Successfully rejected bid");
                    case WAITING_FOR_NEGOTIATION_BIDS:
                        await Promise.all([
                            Bids.update({
                                status: WAITING_FOR_NEGOTIATION_BIDS
                            }, {
                                where: {
                                    id: bidsId
                                }
                            }),

                            // buyer
                            Notifications.create({
                                user_id: bid.user_id,
                                product_id: bid.product.id,
                                bid_id: bidsId,
                                title: "Penawaran anda dalam negosiasi",
                                read: false,
                            }),
                
                            // seller
                            Notifications.create({
                                user_id: userId,
                                product_id: bid.product.id,
                                title: "Melanjutkan penawaran",
                                read: false,
                            })
                        ])
                        return Success200(res, "Successfully accepting bid.");
                    default:
                        return Error4xx(res, 400, "BadRequest");
                }
            } else if (bid.status === WAITING_FOR_NEGOTIATION_BIDS){
                switch(status){
                    case REJECTED_BIDS:
                        await Promise.all([
                            Bids.update({
                                status: REJECTED_BIDS,
                            }, {
                                where: {
                                    id: bidsId,
                                }
                            }),
    
                            // buyer
                            Notifications.create({
                                user_id: bid.user_id,
                                product_id: bid.product.id,
                                bid_id: bidsId,
                                title: "Penawaran anda ditolak",
                                read: false,
                            }),
                
                            // seller
                            Notifications.create({
                                user_id: userId,
                                product_id: bid.product.id,
                                title: "Menolak penawaran",
                                read: false,
                            })
                        ])
                        return Success200(res, "Successfully rejected bid after negotiation");
                    case ACCEPTED_BIDS:
                        await Promise.all([
                            // menerima bid
                            Bids.update({
                                status: ACCEPTED_BIDS
                            }, {
                                where: {
                                    id: bidsId,
                                }
                            }),

                            // menolak semua tawaran
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

                            // ubah status product
                            Products.update({
                                status: SOLD_PRODUCT
                            }, {
                                where: {
                                    id: bid.product_id,
                                }
                            }), 

                            // buyer
                            Notifications.create({
                                user_id: bid.user_id,
                                product_id: bid.product_id,
                                bid_id: bidsId,
                                title: "Penawaran anda diterima",
                                read: false,
                            }),
                
                            // seller
                            Notifications.create({
                                user_id: userId,
                                product_id: bid.product_id,
                                title: "Menyelesaikan penawaran",
                                read: false,
                            }), 
                        ]);


                        const allOtherBids = await Bids.findAll({
                            where: {
                                id: {
                                    [Op.not]: bidsId,
                                }, 
                                product_id: bid.product_id,
                            },
                        })

                        await Promise.all(allOtherBids.map(otherBid => (
                            Notifications.create({
                                user_id: otherBid.user_id,
                                product_id: otherBid.product_id,
                                bid_id: otherBid.id,
                                title: "Penawaran anda ditolak",
                                read: false,
                            })
                        )))
                        return Success200(res, "Successfully done transaction");
                }
            }
            return Error4xx(res, 400, "BadRequest");
        } 
        return Error4xx(res, 400, "BadRequest");
    } catch(err){
        console.log(err);
        Error500(res, err.message);
    }
};

module.exports = UpdateStatusBid;

