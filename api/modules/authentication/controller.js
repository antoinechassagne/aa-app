const Authenticator = require("./services/Authenticator");
const SessionCookie = require("./services/SessionCookie");
const Mails = require("./services/Mails");
const UsersRepository = require("../users/repository");

exports.register = async function (req, res) {
  try {
    const { email, password, ...userInformations } = req.body;
    const userId = await Authenticator.register(email, password, userInformations);
    if (!userId) {
      return res.status(400).send({ error: "Une erreur s'est produite lors de la création du compte." });
    }
    res.status(201).send({ id: userId });
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const userId = await Authenticator.authenticateByCredentials(email, password);
    if (!userId) {
      return res.status(400).send({ error: "L'adresse email et/ou le mot de passe est incorrecte." });
    }
    const sessionId = await Authenticator.initializeSession(userId);
    SessionCookie.setCookie(res, sessionId);
    res.status(200).send({ userId });
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.logout = async function (req, res) {
  const sessionId = SessionCookie.getCookie(req);
  await Authenticator.discardSession(sessionId);
  SessionCookie.discardCookie(res);
  res.sendStatus(204);
};

exports.getLoggedUser = async function (req, res) {
  try {
    const sessionId = SessionCookie.getCookie(req);
    if (!sessionId) {
      return res.status(204).send({ error: "Vous n'êtes pas connecté." });
    }
    const userId = await Authenticator.authenticateBySessionId(sessionId);
    if (!userId) {
      return res.status(204).send({ error: "Vous n'êtes pas connecté." });
    }
    const user = await UsersRepository.getUser({ id: userId });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.verifyEmail = async function (req, res) {
  try {
    const valid = Authenticator.confirmUserEmail(req.query.token);
    if (!valid) {
      return res.status(400).send({ error: "Le lien n'est plus valide." });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.getResetToken = async function (req, res) {
  try {
    const token = await Authenticator.generateUserResetToken(req.query.email);
    if (!token) {
      return res.status(400).send({ error: "Cette adresse email n'est pas reconnue." });
    }
    await Mails.sendResetPasswordEmail(token);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.resetPassword = async function (req, res) {
  try {
    const success = await Authenticator.updateUserPassword(req.body.password, req.body.token);
    if (!success) {
      return res.status(400).send({ error: "Une erreur s'est produite." });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
