const SessionsRepository = require("../modules/authentication/repository");
const SessionCookie = require("../modules/authentication/services/SessionCookie");

async function checkSession(req, res, next) {
  try {
    const sessionId = getSessionIdFromRequestCookie(req);
    if (!sessionId) {
      return res.status(401).send({ error: "Une erreur s'est produite lors de l'authentification." });
    }
    const session = await retrieveSession(sessionId);
    const valid = isSessionValid(session);
    if (!valid) {
      return res.status(401).send({ error: "Une erreur s'est produite lors de l'authentification." });
    }
    await refreshSession(session);
    refreshCookie(res, sessionId);
    req.session = session;
    next();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
}

function getSessionIdFromRequestCookie(req) {
  return req.signedCookies[SessionCookie.COOKIE_NAME];
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

function refreshSession(session) {
  return SessionsRepository.updateSession(
    { id: session.id },
    {
      expirationDate: new Date(Date.now() + SessionCookie.COOKIE_MAX_AGE).toISOString(),
    }
  );
}

function refreshCookie(res, sessionId) {
  SessionCookie.setCookie(res, sessionId);
}

module.exports = checkSession;
