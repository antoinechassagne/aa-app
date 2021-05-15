const GamesRepository = require("./repositories/games");
const UsersRepository = require("../users/repositories/users");

exports.getGame = async function (req, res) {
  try {
    const game = await GamesRepository.getGame({ id: req.params.id });
    if (!game) {
      return res.status(204).send();
    }
    const user = await UsersRepository.getUser({ id: game.creatorId });
    const creator = UsersRepository.getPublicFields(user);
    game.creator = creator;
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.getGames = async function (req, res) {
  try {
    const games = await GamesRepository.getGames(req.query);
    if (!games.length) {
      return res.status(204).send();
    }
    for await (game of games) {
      const user = await UsersRepository.getUser({ id: game.creatorId });
      const creator = UsersRepository.getPublicFields(user);
      game.creator = creator;
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
    await GamesRepository.updateGame({ id: req.params.id }, req.body);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.deleteGame = async function (req, res) {
  try {
    await GamesRepository.deleteGame(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
