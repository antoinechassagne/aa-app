const database = require("../../database/index");

exports.createUser = function (user) {
  return database("users")
    .insert({ ...user, creationDate: new Date().toISOString() })
    .returning("id");
};

exports.getUser = async function (query, includePrivateFields = false) {
  const user = await database("users").where(query).first();
  return includePrivateFields ? user : removePrivateFields(user);
};

exports.getUsers = async function (query, includePrivateFields = false) {
  const users = await database("users").where(query);
  return includePrivateFields ? users : users.map((user) => removePrivateFields(user));
};

exports.updateUser = function (query, update) {
  return database("users")
    .where({ ...query, updateDate: new Date().toISOString() })
    .update(update);
};

exports.deleteUsers = function (query) {
  return database("users").where(query).del();
};

function removePrivateFields(user) {
  if (!user) {
    return null;
  }
  const { password, salt, confirmationToken, resetToken, ...publicFields } = user;
  return publicFields;
}
