const Joi = require("joi");

const schema = Joi.object({
  userId: Joi.number().required(),
  gameId: Joi.string().required(),
});

module.exports = schema;
