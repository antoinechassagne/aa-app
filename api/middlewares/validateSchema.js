function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ error: "Les champs ne sont pas valides." });
    }
    next();
  };
}

module.exports = validateSchema;
