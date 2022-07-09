const { Error4xx, Error500 } = require('../../helpers/response/error')
const { Success200 } = require('../../helpers/response/success')
const { Bids, Products } = require('../../models')
const { REJECTED_BIDS, ACCEPTED_BIDS } = require('../../helpers/database/enums')

const UpdateStatusBid = async (req, res) => {
    try{
        const { bidsId } = req.params
        const { status } = req.body
        
        const whiteListStatus = {
            REJECTED_BIDS: true,
            ACCEPTED_BIDS: true,
        }

        if (whiteListStatus[status]){
            const bid = await Bids.findOne({
                where: {
                    id: bidsId
                }
            })

            if (!bid){
                return Error4xx(res, 404, "Bid Not Found")
            }

            const updatedBid = await Bids.update({
                status
            }, {
                where: {
                    id: bidsId
                }
            })

            console.log(updatedBid)

            switch (status){
                case REJECTED_BIDS:
                    return Success200(res, "Successfully rejected bid")
                case ACCEPTED_BIDS:
                    return Success200(res, "Successfully accepted bid")
            }
        }
    } catch(err){
        Error500(res, err.message)
    }
}

module.exports = UpdateStatusBid

