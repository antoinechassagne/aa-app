const ParticipationsRepository = require("../repositories/participations");
const GamesRepository = require("../../games/repositories/games");
const NotificationGenerator = require("../../notifications/services/NotificationsGenerator");
const participationStatuses = require("../../../../common/constants/participationStatuses");

/**
 * Trigger logic that results from a participation creation.
 *
 * @param {String} participationId
 */
async function onParticipationCreation(participationId) {
  const participation = await ParticipationsRepository.getParticipation({ id: participationId });
  const { gameId } = participation;
  const game = await GamesRepository.getGame({ id: gameId });
  await NotificationGenerator.createNotification(game.creatorId, NotificationGenerator.types.NEW_PARTICIPATION, {
    gameId,
  });
}

/**
 * Trigger logic that results from a participation deletion.
 *
 * @param {String} participationId
 * @param {Number} triggerUserId The user's id that trigger the update
 */
async function onParticipationDeletion(participationId, triggerUserId) {
  const participation = await ParticipationsRepository.getParticipation({ id: participationId });
  const { statusId, gameId } = participation;
  const game = await GamesRepository.getGame({ id: gameId });
  if (statusId === participationStatuses.ACCEPTED) {
    await incrementGameMissingPlayers(gameId);
    const recipientUserId = triggerUserId === participation.userId ? game.creatorId : participation.userId;
    await NotificationGenerator.createNotification(
      recipientUserId,
      NotificationGenerator.types.PARTICIPATION_CANCELED,
      { gameId }
    );
  }
}

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
    await NotificationGenerator.createNotification(
      participation.userId,
      NotificationGenerator.types.PARTICIPATION_ACCEPTED,
      { gameId }
    );
  }
  if (update.statusId === participationStatuses.REFUSED) {
    await NotificationGenerator.createNotification(
      participation.userId,
      NotificationGenerator.types.PARTICIPATION_REFUSED,
      { gameId }
    );
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

module.exports = { onParticipationCreation, onParticipationDeletion, onParticipationUpdate };
