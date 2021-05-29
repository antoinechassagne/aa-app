const UsersRepository = require("./repository");

exports.getUser = async function (req, res) {
  try {
    const user = await UsersRepository.getUser({ id: req.params.id });
    if (!user) {
      return res.status(204).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.getUsers = async function (req, res) {
  try {
    const users = await UsersRepository.getUsers(req.query);
    if (!users.length) {
      return res.status(204).send();
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
