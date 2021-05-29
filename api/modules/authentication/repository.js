const { v4: uuidv4 } = require("uuid");
const database = require("../../database/index");

exports.createSession = function (session) {
  return database("sessions")
    .insert({ ...session, id: uuidv4(), creationDate: new Date().toISOString() })
    .returning("id");
};

exports.getSession = function (query) {
  return database("sessions").where(query).first();
};

exports.getSessions = function (query) {
  return database("sessions").where(query);
};

exports.updateSession = function (query, update) {
  return database("sessions")
    .where(query)
    .update({ ...update, updateDate: new Date().toISOString() });
};

exports.deleteSessions = function (query) {
  return database("sessions").where(query).del();
};
