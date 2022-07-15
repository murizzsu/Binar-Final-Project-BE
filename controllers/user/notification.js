const {
  Products,
  Users,
  Notifications,
  Images,
  Bids,
} = require("../../models");
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");
// const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const notificationResponse = (notifications) =>{
  return notifications.map((notification) => ({
      id: notification.id,
      user_id: notification.users?notification.users.id:{},
      title: notification.title,
      message: notification.message,
      read: notification.read,
      products:{
          product_id: notification.product_id,
          name: notification.products?notification.products.name : '',
          price: notification.products?notification.products.price : 0,
      },
      bids: {
        user_id: notification.bids?notification.bids.user_id : 0,
        request_price: notification.bids?notification.bids.request_price : 0,
        status: notification.bids?notification.bids.status : '',
      },
      images: notification.images?notification.images[0] : '',
    }));
};
 
module.exports = async function notification(req, res) {
  try {

    let queryProducts = {};
    let queryImages = {};
    let queryUsers = {};
    let queryBids = {};

    // const { excludeUserId, user_id } = req.query;

    // if (user_id) {
    //   queryProducts = { ...queryProducts, user_id: user_id };
    // }

    // if (excludeUserId) {
    //   queryProducts = {
    //     ...queryProducts,
    //     user_id: { [Op.not]: excludeUserId },
    //   };
    // }

    const { id: userId } = req.user;

    // let user = await Users.findByPk(Number(userId));

    const user = await Users.findOne({
      where: {
          id: userId
      }
  });

    const notifications = await Notifications.findAll({
      // where: queryProducts,
      where: {
        user_id : user.id
      },
      include: [
        {
          model: Products,
          as: "products",
          where: queryProducts,
          required: false,
          include:[
            {
              model: Images,
              as: "images",
              where: queryImages,
              required: false,
              order: [["id", "ASC"]],
            },
          ]
        },
        {
          model: Users,
          as: "users",
          where: queryUsers,
          required: false
        },
        {
          model: Bids,
          as: "bids",
          where: queryBids,
          required: false
        },
      ],
      order: [["id", "DESC"]],
    });

    return Success200(res, notificationResponse(notifications));
  } catch (err) {
    console.log(err);
    return Error500(res, err);
  }
};
