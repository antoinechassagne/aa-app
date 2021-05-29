const Mailer = require("../../../services/Mailer");
const UsersRepository = require("../../users/repository");

async function sendConfirmationMail(userId) {
  const user = await UsersRepository.getUser({ id: userId }, true);
  const url = `${process.env.CLIENT_URL}/email-verification?token=${user.confirmationToken}`;
  const text = `${user.pseudo}, pour finaliser votre inscription, merci de cliquez sur : ${url}`;
  Mailer.sendMail({
    to: user.email,
    subject: "Ludis - Finalisez votre inscription",
    text,
  });
}

async function sendResetPasswordEmail(token) {
  const user = await UsersRepository.getUser({ resetToken: token }, true);
  const url = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  const text = `${user.pseudo}, pour réinitialiser votre mot de passe, merci de cliquez sur : ${url}`;
  Mailer.sendMail({
    to: user.email,
    subject: "Ludis - Réinitialisez votre mot de passe",
    text,
  });
}

module.exports = { sendConfirmationMail, sendResetPasswordEmail };
