const { NUMBER } = require("sequelize");
const { Error4xx, Error500 } = require("../../helpers/response/error");
const { Success200 } = require("../../helpers/response/success");
const { Notifications } = require("../../models");

const UpdateNotification = async (req, res) => {
  try {
    const notificationId  = req.params.id;

    const notification = await Notifications.findOne({
      where: {
        id: notificationId,
      },
    });

    console.log("notification", notification);

    if (!notification.read) {
      if (notification.user_id === Number(notificationId)) {
        const updatedNotification = await Notifications.update(
          {
            read: true,
          },
          {
            where: {
              id: notificationId,
            },
          }
        );

        console.log("update",!notification.read);
        return Success200(res, "Successfull Update Notification");
      }
      console.log("notification.user_id = ", notification.user_id === notificationId);
      console.log("notidicationId", notificationId);
      return Error4xx(res, 400, "BadRequest");
    }
    return Error4xx(res, 404, "Notification Not Found");
    
  } catch (err) {
    console.log(err);
    return Error500(res, err.message);
  }
};

module.exports = UpdateNotification;

