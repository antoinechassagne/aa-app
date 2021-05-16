const ParticipationsRepository = require("./repositories/participations");
const GamesRepository = require("../games/repositories/games");

exports.getParticipation = async function (req, res) {
  try {
    const participation = await ParticipationsRepository.getParticipation({ id: req.params.id });
    if (!participation) {
      return res.status(204).send();
    }
    participation.game = await GamesRepository.getGame({ id: participation.gameId });
    res.status(200).send(participation);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.getParticipations = async function (req, res) {
  try {
    const participations = await ParticipationsRepository.getParticipations(req.query);
    if (!participations.length) {
      return res.status(204).send();
    }
    for await (participation of participations) {
      participation.game = await GamesRepository.getGame({ id: participation.gameId });
    }
    res.status(200).send(participations);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.createParticipation = async function (req, res) {
  try {
    const [id] = await ParticipationsRepository.createParticipation(req.body.userId, req.body.gameId);
    res.status(200).send(id);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.updateParticipation = async function (req, res) {
  try {
    await ParticipationsRepository.updateParticipation({ id: req.params.id }, req.body.statusId);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.deleteParticipation = async function (req, res) {
  try {
    await ParticipationsRepository.deleteParticipation(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
