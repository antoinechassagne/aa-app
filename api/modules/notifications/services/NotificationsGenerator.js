const NotificationsRepository = require("../repository");
const types = require("../../../constants/notificationTypes");

/**
 * Create a notification.
 *
 * @param {Number} userId Recipient user
 * @param {String} type Notification type
 * @param {Object} content Any additional informations
 */
function createNotification(userId, type, content) {
  return NotificationsRepository.createNotification({ userId, type, read: false, content });
}

module.exports = { types, createNotification };
