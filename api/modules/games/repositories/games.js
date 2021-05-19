const { v4: uuidv4 } = require("uuid");
const database = require("../../../database/index");

exports.createGame = function (game) {
  return database("games")
    .insert({ ...game, id: uuidv4(), creationDate: new Date().toISOString() })
    .returning("id");
};

exports.getGame = function (query) {
  return database("games").where(query).first();
};

exports.getGames = function (query) {
  return database("games").where(query).orderBy("creationDate", "desc");
};

exports.updateGame = function (id, update) {
  return database("games")
    .where({ id })
    .update({ ...update, updateDate: new Date().toISOString() });
};

exports.deleteGame = function (id) {
  return database("games").where({ id }).del();
};
