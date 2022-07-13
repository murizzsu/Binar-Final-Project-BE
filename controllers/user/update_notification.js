const { Notifications } = require("../../models");

const jwt = require("jsonwebtoken");

async function updateNotification(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    let notificationId = req.params.id;
    let notification = await Notifications.findByPk(notificationId);
    console.log("Id = ",notification);
    console.log("User data ID", userData.id);
    if (!notification.is_read) {
      if (notification.user_id == userData.id) {
        await Notifications.update(
          {
            read: true,
          },
          {
            where: {
              id: notification.id,
            },
          }
        );

        res.json({
          message: "Update notifikasi berhasil",
        });
      } else {
        res.json({
          message: "Not Authorized",
        });
      }
      res.json({
          message: "Update notifikasi berhasil",
        });
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports = updateNotification;
