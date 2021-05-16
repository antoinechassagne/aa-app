const GamesRepository = require("../games/repositories/games");
const ParticipationsRepository = require("./repositories/participations");
const SocketUtils = require("../../services/SocketUtils");
const participationStatuses = require("../../../common/constants/participationStatuses");

exports.createParticipation = function (io, socket) {
  socket.on("participations:request", async ({ emitterUserId, payload }) => {
    console.log("participations:request", { emitterUserId, payload });
    const { gameId } = payload;
    await ParticipationsRepository.createParticipation({
      userId: emitterUserId,
      gameId,
      statusId: participationStatuses.PENDING,
    });
    const { creatorId } = await GamesRepository.getGame({ id: gameId });
    const creatorSocket = SocketUtils.findConnectedUserSocket(io, creatorId);
    /* @TODO Create a notification in database */
    if (creatorSocket) {
      io.to(creatorSocket.id).emit("participations:request", { gameId, joinerId: emitterUserId });
    }
  });
};
