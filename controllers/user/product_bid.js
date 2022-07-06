const { Products } = require("../../models");
const { Bids } = require("../../models");
const { Users } = require("../../models");

const jwt = require("jsonwebtoken");

async function bidProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let user = jwt.verify(header, "s3cr3t");

    let productsList = await Products.findAll({
      where: { user_id: user.id },
    });

    let listInterestedProducts = [];

    let listBids = await Bids.findAll();

    for (let i in productsList) {
      for (let j in listBids) {
        if (listBids[j].product_id == productsList[i].id) {
          const bidder = await Users.findByPk(listBids[j].bidder_id);

          listInterestedProducts.push({
            name: productsList[i].name,
            bidder: bidder.name,
            price: productsList[i].price,
            offer_price: listBids[j].price,
          });
        }
      }
    }

    if (listInterestedProducts.length > 0) {
      res.send(listInterestedProducts);
    } else {
      res.send("Saat ini produkmu belum ada yang minat nih");
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports = bidProduct;
