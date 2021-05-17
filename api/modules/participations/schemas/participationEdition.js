const Joi = require("joi");

const schema = Joi.object({
  userId: Joi.number(),
  gameId: Joi.string(),
  statusId: Joi.number().integer().min(1).max(3),
});

module.exports = schema;
