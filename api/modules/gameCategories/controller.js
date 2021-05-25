const GameCategoriesRepository = require("./repository");

exports.getGameCategories = async function (req, res) {
  try {
    const categories = await GameCategoriesRepository.getGameCategories(req.query);
    if (!categories.length) {
      return res.status(204).send();
    }
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
