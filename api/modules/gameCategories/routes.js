const controller = require("./controller");

module.exports = [
  {
    method: "GET",
    path: "/game-categories",
    handler: controller.getGameCategories,
  },
];
