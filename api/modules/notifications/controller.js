const NotificationsRepository = require("./repository");

exports.getNotifications = async function (req, res) {
  try {
    const notifications = await NotificationsRepository.getNotifications(req.query);
    if (!notifications.length) {
      return res.status(204).send();
    }
    res.status(200).send(notifications);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.updateNotification = async function (req, res) {
  try {
    await ParticipationsRepository.updateNotification(req.params.id, req.body);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
