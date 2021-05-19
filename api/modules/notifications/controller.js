const NotificationsRepository = require("./repository");
const GamesRepository = require("../games/repositories/games");

exports.getNotifications = async function (req, res) {
  try {
    const notifications = await NotificationsRepository.getNotifications(req.query);
    if (!notifications.length) {
      return res.status(204).send();
    }
    for await (notification of notifications) {
      if (notification.content.gameId) {
        notification.game = await GamesRepository.getGame({ id: notification.content.gameId });
      }
    }
    res.status(200).send(notifications);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.updateNotification = async function (req, res) {
  try {
    await NotificationsRepository.updateNotification(req.params.id, req.body);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
