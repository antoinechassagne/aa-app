const controller = require("./controller");
const notificationEditionSchema = require("./schemas/notificationEdition");

module.exports = [
  {
    method: "GET",
    path: "/notifications",
    handler: controller.getNotifications,
    authenticated: true,
  },
  {
    method: "PUT",
    path: "/notifications/:id",
    handler: controller.updateNotification,
    schema: notificationEditionSchema,
    authenticated: true,
  },
];
