const { Products } = require("../../models");
const { Bids } = require("../../models");
const { Users } = require("../../models");

const jwt = require("jsonwebtoken");
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");

async function bidProduct(req, res) {
  // try {
  //   const { id: userId } = req.user

  //   let productsList = await Products.findAll({
  //     where: {
  //       user_id: userId 
  //     },
  //     include: [
  //       {
  //         model: Bids,
  //         as: 'bids',
  //         include: {
  //           model: Users,
  //           as: 'user'
  //         }
  //       }
  //     ]
  //   });

  //   let listInterestedProducts = [];

  //   let listBids = await Bids.findAll();

  //   for (let i in productsList) {
  //     for (let j in listBids) {
  //       if (listBids[j].product_id == productsList[i].id) {
  //         const bidder = await Users.findByPk(listBids[j].bidder_id);

  //         listInterestedProducts.push({
  //           name: productsList[i].name,
  //           bidder: bidder.name,
  //           price: productsList[i].price,
  //           offer_price: listBids[j].price,
  //         });
  //       }
  //     }
  //   }

  //   return Success200(res, listInterestedProducts);
  // } catch (err) {
  //   return Error500(res, err.message);
  // }
}

module.exports = bidProduct;
