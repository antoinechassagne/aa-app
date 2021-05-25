const Joi = require("joi");

const schema = Joi.object({
  plannedDate: Joi.date().required(),
  creatorId: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  boardGameName: Joi.string().required(),
  categoryId: Joi.number().required(),
  description: Joi.string(),
  missingPlayers: Joi.number(),
});

module.exports = schema;
