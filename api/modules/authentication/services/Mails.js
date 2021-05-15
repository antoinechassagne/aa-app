const Mailer = require("../../../services/Mailer");
const UsersRepository = require("../../users/repositories/users");

async function sendConfirmationMail(userId) {
  const user = await UsersRepository.getUser({ id: userId }, true);
  const url = `${process.env.CLIENT_URL}/email-verification?token=${user.confirmationToken}`;
  const text = `${user.pseudo}, pour finaliser votre inscription, merci de cliquez sur : ${url}`;
  Mailer.sendMail({
    to: user.email,
    subject: "AA App - Finalisez votre inscription",
    text,
  });
}

async function sendResetPasswordEmail(token) {
  const user = await UsersRepository.getUser({ resetToken: token }, true);
  const url = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  const text = `${user.pseudo}, pour réinitialiser votre mot de passe, merci de cliquez sur : ${url}`;
  Mailer.sendMail({
    to: user.email,
    subject: "AA App - Réinitialisez votre mot de passe",
    text,
  });
}

module.exports = { sendConfirmationMail, sendResetPasswordEmail };
