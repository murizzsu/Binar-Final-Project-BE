const { Error4xx, Error500 } = require("../../helpers/response/error");
const { Success200 } = require("../../helpers/response/success");
const { Notifications } = require("../../models");

const UpdateNotification = async (req, res) => {
  try {
    const notificationId  = req.params.id;
    const { id:userId } = req.user;

    const notification = await Notifications.findOne({
      where: {
        id: notificationId,
      },
    });

    console.log("notification", notification);

    if (notification) {
      if (notification.user_id === Number(userId)) {
        await Notifications.update(
          {
            read: true,
          },
          {
            where: {
              id: notificationId,
            },
          }
        );

        return Success200(res, "Successfull Update Notification");
      }
      return Error4xx(res, 403, "You are not the owner of this notification");
    }
    return Error4xx(res, 404, "Notification Not Found");
    
  } catch (err) {
    console.log(err);
    return Error500(res, err.message);
  }
};

module.exports = UpdateNotification;

