exports.onRequestToJoin = function (io, socket) {
  socket.on("games:request-to-join", ({ emitterUserId, payload }) => {
    console.log("games:request-to-join", { emitterUserId, payload });
    const { gameId } = payload;
    socket.emit("games:request-to-join", { gameId });
  });
};
