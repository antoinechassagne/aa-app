function findConnectedUserSocket(io, userId) {
  const sockets = Array.from(io.sockets.sockets);
  const userSocket = sockets.find((socket) => {
    const [socketId, socketDetails] = socket;
    return socketDetails.session && socketDetails.session.userId === userId;
  });
  if (!userSocket) {
    return null;
  }
  const [socketId, socketDetails] = userSocket;
  return socketDetails;
}

module.exports = { findConnectedUserSocket };
