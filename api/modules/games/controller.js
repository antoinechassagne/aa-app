const GamesRepository = require("./repository");
const ParticipationsRepository = require("../participations/repository");
const UsersRepository = require("../users/repository");
const GameCategoriesRepository = require("../gameCategories/repository");

exports.getGame = async function (req, res) {
  try {
    const game = await GamesRepository.getGame({ id: req.params.id });
    if (!game) {
      return res.sendStatus(204);
    }
    game.creator = await UsersRepository.getUser({ id: game.creatorId });
    game.category = await GameCategoriesRepository.getGameCategory({ id: game.categoryId });
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.getGames = async function (req, res) {
  try {
    const games = await GamesRepository.getGames(req.query);
    if (!games.length) {
      return res.status(200).send([]);
    }
    for (game of games) {
      game.creator = await UsersRepository.getUser({ id: game.creatorId });
      game.category = await GameCategoriesRepository.getGameCategory({ id: game.categoryId });
    }
    res.status(200).send(games);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.createGame = async function (req, res) {
  try {
    const [id] = await GamesRepository.createGame(req.body);
    res.status(200).send(id);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.updateGame = async function (req, res) {
  try {
    await GamesRepository.updateGame(req.params.id, req.body);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.deleteGame = async function (req, res) {
  try {
    await ParticipationsRepository.deleteParticipations({ gameId: req.params.id });
    await GamesRepository.deleteGame(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
