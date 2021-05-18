const Joi = require("joi");

const schema = Joi.object({
  userId: Joi.number().required(),
  gameId: Joi.string().required(),
  statusId: Joi.number().integer().min(1).max(3).required(),
});

module.exports = schema;
