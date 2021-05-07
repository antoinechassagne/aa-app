export function onRequestToJoin(socket, store) {
  socket.on("games:request-to-join", (data) => {
    store.dispatch("games/onRequestToJoin", data);
  });
}
