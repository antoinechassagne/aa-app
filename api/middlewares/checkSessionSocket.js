const SessionsRepository = require("../modules/authentication/repositories/sessions");
const SessionCookie = require("../modules/authentication/services/SessionCookie");

async function checkSessionSocket(socket, next) {
  try {
    const sessionId = getSessionIdFromCookie(socket);
    if (!sessionId) {
      return;
    }
    const session = await retrieveSession(sessionId);
    const valid = isSessionValid(session);
    if (!valid) {
      return;
    }
    socket.session = session;
    next();
  } catch (err) {
    return;
  }
}

function getSessionIdFromCookie(socket) {
  const cookies = SessionCookie.parseCookieHeader(socket.request.headers.cookie);
  const sessionId = SessionCookie.decodeSignedCookie(cookies[SessionCookie.COOKIE_NAME]);
  return sessionId;
}

function retrieveSession(sessionId) {
  return SessionsRepository.getSession({ id: sessionId });
}

function isSessionValid(session) {
  if (!session) {
    return false;
  }
  if (new Date(session.expirationDate) <= new Date(Date.now())) {
    return false;
  }
  return true;
}

module.exports = checkSessionSocket;
