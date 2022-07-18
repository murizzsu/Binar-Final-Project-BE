const {
  Products,
  Users,
  Notifications,
  Images,
  Bids,
} = require("../../models");
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");


const notificationResponse = (notifications) =>{
  console.log(notifications);
  return notifications.map((notification) => ({
      id: notification.id,
      user_id: notification.users?notification.users.id:{},
      title: notification.title,
      message: notification.message,
      read: notification.read,
      createAt : notification.createdAt,
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
      images: notification.products?notification.products.images[0] : '',
    }));
    
};
 
module.exports = async function notification(req, res) {
  try {

    let queryProducts = {};
    let queryImages = {};
    let queryUsers = {};
    let queryBids = {};

    const { id: userId } = req.user;

    const user = await Users.findOne({
      where: {
          id: userId
      }
  });

    const notifications = await Notifications.findAll({

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
