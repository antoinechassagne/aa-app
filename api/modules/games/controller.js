const GamesRepository = require("./repositories/games");
const ParticipationsRepository = require("../participations/repositories/participations");
const UsersRepository = require("../users/repositories/users");

exports.getGame = async function (req, res) {
  try {
    const game = await GamesRepository.getGame({ id: req.params.id });
    if (!game) {
      return res.status(204).send();
    }
    const [creator, participations] = await Promise.all([
      UsersRepository.getUser({ id: game.creatorId }),
      ParticipationsRepository.getParticipations({ gameId: game.id }),
    ]);
    game.creator = creator;
    game.participations = participations;
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
      const [creator, participations] = await Promise.all([
        UsersRepository.getUser({ id: game.creatorId }),
        ParticipationsRepository.getParticipations({ gameId: game.id }),
      ]);
      game.creator = creator;
      game.participations = participations;
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
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.deleteGame = async function (req, res) {
  try {
    await GamesRepository.deleteGame({ id: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
