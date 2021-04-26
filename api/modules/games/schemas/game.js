const Joi = require("joi");

const schema = Joi.object({
  creatorId: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  boardGameName: Joi.string().required(),
  description: Joi.string(),
  missingPlayers: Joi.number(),
});

module.exports = schema;
