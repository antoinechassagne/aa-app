const ParticipationsRepository = require("../repositories/participations");
const GamesRepository = require("../../games/repositories/games");
const participationStatuses = require("../../../../common/constants/participationStatuses");

/**
 * Trigger logic that results from a change of participation's status.
 *
 * @param {String} participationId
 * @param {Object} update
 */
async function onParticipationUpdate(participationId, update) {
  if (!update.statusId) {
    return;
  }
  const participation = await ParticipationsRepository.getParticipation({ id: participationId });
  const { statusId: previousStatusId, gameId } = participation;
  if (previousStatusId === update.statusId) {
    return;
  }
  if (update.statusId === participationStatuses.ACCEPTED) {
    await decrementGameMissingPlayers(gameId);
  }
}

/**
 * Trigger logic that results from a participation deletion.
 *
 * @param {String} participationId
 */
async function onParticipationDeletion(participationId) {
  const participation = await ParticipationsRepository.getParticipation({ id: participationId });
  const { statusId, gameId } = participation;
  if (statusId === participationStatuses.ACCEPTED) {
    await incrementGameMissingPlayers(gameId);
  }
}

async function incrementGameMissingPlayers(gameId) {
  const { missingPlayers: previousMissingPlayers } = await GamesRepository.getGame({ id: gameId });
  return GamesRepository.updateGame(gameId, { missingPlayers: previousMissingPlayers + 1 });
}

async function decrementGameMissingPlayers(gameId) {
  const { missingPlayers: previousMissingPlayers } = await GamesRepository.getGame({ id: gameId });
  return GamesRepository.updateGame(gameId, { missingPlayers: previousMissingPlayers - 1 });
}

module.exports = { onParticipationUpdate, onParticipationDeletion };
