const { v4: uuidv4 } = require("uuid");
const database = require("../../../database/index");

exports.createGameParticipation = function (userId, gameId) {
  return database("gameParticipation").insert({ id: uuidv4(), userId, gameId }).returning("id");
};

exports.getGameParticipation = function (query) {
  return database("gameParticipation").where(query).first();
};

exports.getGameParticipations = function (query) {
  return database("gameParticipation").where(query);
};

exports.deleteGameParticipation = function (query) {
  return database("gameParticipation").where(query).del();
};
