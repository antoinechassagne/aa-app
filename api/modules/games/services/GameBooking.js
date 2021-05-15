const GamesRepository = require("../repositories/games");
const JoinRequestsRepository = require("../repositories/joinRequests");
const gameParticipationsRepository = require("../repositories/gameParticipations");

function createJoinRequest(joinerId, gameId) {
  return JoinRequestsRepository.createJoinRequest(joinerId, gameId);
}

async function acceptJoinRequest(joinRequestId) {
  const joinRequest = await JoinRequestsRepository.getJoinRequest({ id: joinRequestId });
  gameParticipationsRepository.createGameParticipation(joinRequest.userId, joinRequest.gameId);
  await decrementGameMissingPlayers(joinRequest.gameId);
  await deleteJoinRequest(joinRequestId);
}

async function decrementGameMissingPlayers(gameId) {
  const currentGameMissingPlayers = await getCurrentGameMissingPlayers(gameId);
  const updatedGameMissingPlayers = currentGameMissingPlayers ? currentGameMissingPlayers - 1 : 0;
  return GamesRepository.updateGame({ id: gameId, missingPlayers: updatedGameMissingPlayers });
}

async function getCurrentGameMissingPlayers(gameId) {
  const game = GamesRepository.getGame({ id: gameId });
  return game.missingPlayers;
}

function refuseJoinRequest(joinRequestId) {
  return deleteJoinRequest(joinRequestId);
}

function deleteJoinRequest(joinRequestId) {
  return JoinRequestsRepository.deleteJoinRequest({ id: joinRequestId });
}

module.exports = {
  createJoinRequest,
  acceptJoinRequest,
  refuseJoinRequest,
  decrementGameMissingPlayers,
};
