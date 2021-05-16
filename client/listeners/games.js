export function onRequestToJoin(socket, store) {
  socket.on("participations:request", (data) => {
    store.dispatch("games/onParticipationRequest", data);
  });
}
