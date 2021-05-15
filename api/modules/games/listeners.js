const GamesRepository = require("./repositories/games");
const JoinRequestsRepository = require("./repositories/joinRequests");
const GameBooking = require("./services/GameBooking");
const SocketUtils = require("../../services/SocketUtils");

exports.onRequestToJoin = function (io, socket) {
  socket.on("games:request-to-join", async ({ emitterUserId, payload }) => {
    console.log("games:request-to-join", { emitterUserId, payload });
    const { gameId } = payload;
    await JoinRequestsRepository.createJoinRequest(emitterUserId, gameId);
    const { creatorId } = await GamesRepository.getGame({ id: gameId });
    const creatorSocket = SocketUtils.findConnectedUserSocket(io, creatorId);
    if (creatorSocket) {
      /* @TODO Create a notification in database */
      io.to(creatorSocket.id).emit("games:request-to-join", { gameId, joinerId: emitterUserId });
    }
  });
};
