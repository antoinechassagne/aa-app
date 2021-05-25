const database = require("../../database/index");

exports.getGameCategory = function (query) {
  return database("gameCategories").where(query).first();
};

exports.getGameCategories = function (query) {
  return database("gameCategories").where(query).orderBy("label", "desc");
};
