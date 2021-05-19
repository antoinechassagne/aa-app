const { v4: uuidv4 } = require("uuid");
const database = require("../../../database/index");

exports.createParticipation = function (participation) {
  return database("participations")
    .insert({ id: uuidv4(), creationDate: new Date().toISOString(), ...participation })
    .returning("id");
};

exports.getParticipation = function (query) {
  return database("participations").where(query).first();
};

exports.getParticipations = function (query) {
  return database("participations").where(query).orderBy("statusId", "asc").orderBy("creationDate", "desc");
};

exports.updateParticipation = function (id, update) {
  return database("participations")
    .where({ id })
    .update({ ...update, updateDate: new Date().toISOString() });
};

exports.deleteParticipation = function (id) {
  return database("participations").where({ id }).del();
};
