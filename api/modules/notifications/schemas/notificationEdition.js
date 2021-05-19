const Joi = require("joi");

const schema = Joi.object({
  read: Joi.boolean(),
});

module.exports = schema;
