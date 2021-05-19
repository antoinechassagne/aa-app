const { v4: uuidv4 } = require("uuid");
const database = require("../../database/index");

exports.createNotification = function (notification) {
  return database("notifications")
    .insert({ id: uuidv4(), creationDate: new Date().toISOString(), ...notification })
    .returning("id");
};

exports.getNotification = function (query) {
  return database("notifications").where(query).first();
};

exports.getNotifications = function (query) {
  return database("notifications").where(query);
};

exports.updateNotification = function (id, update) {
  return database("notifications")
    .where({ id })
    .update({ ...update, updateDate: new Date().toISOString() });
};

exports.deleteNotification = function (id) {
  return database("notifications").where({ id }).del();
};
