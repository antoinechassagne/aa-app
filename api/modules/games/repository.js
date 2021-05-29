const { v4: uuidv4 } = require("uuid");
const database = require("../../database/index");

exports.createGame = function (game) {
  return database("games")
    .insert({ ...game, id: uuidv4(), creationDate: new Date().toISOString() })
    .returning("id");
};

exports.getGame = function (query) {
  return database("games").where(query).first();
};

exports.getGames = function (query) {
  const { end, start, missingPlayers, ...where } = query;
  return database("games")
    .where(where)
    .modify((queryBuilder) => {
      if (start) {
        queryBuilder.where("plannedDate", ">=", start);
      }
      if (end) {
        queryBuilder.where("plannedDate", "<=", end);
      }
      if (missingPlayers) {
        queryBuilder.where("missingPlayers", ">", 0);
      }
    })
    .orderBy("creationDate", "desc");
};

exports.updateGame = function (id, update) {
  return database("games")
    .where({ id })
    .update({ ...update, updateDate: new Date().toISOString() });
};

exports.deleteGame = function (id) {
  return database("games").where({ id }).del();
};
