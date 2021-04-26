const controller = require("./controller");
const gameSchema = require("./schemas/game");

module.exports = [
  {
    method: "GET",
    path: "/games/:id",
    handler: controller.getGame,
  },
  {
    method: "GET",
    path: "/games",
    handler: controller.getGames,
  },
  {
    method: "POST",
    path: "/games",
    handler: controller.createGame,
    schema: gameSchema,
  },
  {
    method: "PUT",
    path: "/games/:id",
    handler: controller.updateGame,
    schema: gameSchema,
  },
  {
    method: "DELETE",
    path: "/games/:id",
    handler: controller.deleteGame,
  },
];
