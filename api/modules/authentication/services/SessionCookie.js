const cookieParser = require("cookie-parser");
const parseCookie = require("cookie").parse;

const COOKIE_NAME = "session";
const COOKIE_MAX_AGE = 3024000000; /* 5 weeks */
const COOKIE_SECRET = process.env.COOKIE_SECRET;

function setCookie(res, sessionId) {
  const options = {
    secure: true,
    path: "/",
    expires: new Date(Date.now() + COOKIE_MAX_AGE),
    signed: true,
    httpOnly: true,
    sameSite: "None",
  };
  if (process.env.NODE_ENV !== "development") {
    options.domain = process.env.CLIENT_DOMAIN;
  }
  res.cookie(COOKIE_NAME, sessionId, options);
}

function getCookie(req) {
  return req.signedCookies[COOKIE_NAME];
}

function discardCookie(res) {
  res.cookie(COOKIE_MAX_AGE, "", { expires: new Date(0) });
}

function parseCookieHeader(cookieHeader) {
  return parseCookie(cookieHeader);
}

function decodeSignedCookie(signedCookieValue) {
  return cookieParser.signedCookie(signedCookieValue, COOKIE_SECRET);
}

module.exports = {
  COOKIE_NAME,
  COOKIE_MAX_AGE,
  COOKIE_SECRET,
  setCookie,
  getCookie,
  discardCookie,
  parseCookieHeader,
  decodeSignedCookie,
};
