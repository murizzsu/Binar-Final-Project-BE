const {
    Users,
    Bids,
    Products,
    Images,
    Notifications,
  } = require("../../models");
  const jwt = require("jsonwebtoken");
  
  async function notification(req, res) {
    try {
      let header = req.headers.authorization.split("Bearer ")[1];
      let userData = jwt.verify(header, "s3cr3t");
  
      let user = await Users.findByPk(userData.id);
  
      if (user) {
        let listNotification = [];
  
        let getNotification = await Notifications.findAll({
          where: {
            user_id: user.id,
          },
        });
        
        for (let i = 0; i < getNotification.length; i++) {
          const getProduct = await Products.findByPk(
            getNotification[i].product_id
          );
          const getImages = await Images.findOne({
            where: { product_id: getProduct.id },
          });
  
          const getBid = await Bids.findOne({
            where: { id: getNotification[i].bid_id },
          });
  
          if (getBid) {
              let notificationData = {
                title: getNotification[i].title,
                name: getProduct.name,
                price: getProduct.price,
                request_price: getBid.request_price,
                image: getImages ? getImages.name : '',
                date: getNotification[i].createdAt,
              };
              listNotification.push(notificationData);
          } else {
            let notificationData = {
              title: getNotification[i].title,
              name: getProduct.name,
              price: getProduct.price,
              image: getImages ? getImages.name : '',
              date: getNotification[i].createdAt,
            };
            listNotification.push(notificationData);
          }
        }
        
        // listNotification = getNotification;
        console.log("list",listNotification);
        if (listNotification.length > 0) {
          let response = listNotification.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          });
          // console.log(response);
          res.send(
            response
          );
        } else {
          res.json({ message: "Anda tidak memiliki notifikasi" });
        }
      } else {
        res.json({ message: "Error" });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  
  module.exports = notification;
  
  