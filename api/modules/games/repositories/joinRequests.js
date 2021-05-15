const { v4: uuidv4 } = require("uuid");
const database = require("../../../database/index");

exports.createJoinRequest = function (userId, gameId) {
  return database("joinRequests").insert({ id: uuidv4(), userId, gameId }).returning("id");
};

exports.getJoinRequest = function (query) {
  return database("joinRequests").where(query).first();
};

exports.getJoinRequests = function (query) {
  return database("joinRequests").where(query);
};

exports.deleteJoinRequest = function (query) {
  return database("joinRequests").where(query).del();
};
