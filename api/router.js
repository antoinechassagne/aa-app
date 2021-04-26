const router = require("express").Router();
const authentication = require("./modules/authentication/routes");
const users = require("./modules/users/routes");
const games = require("./modules/games/routes");
const checkSession = require("./middlewares/checkSession");
const validateSchema = require("./middlewares/validateSchema");

const routes = [...authentication, ...users, ...games];

routes.forEach((route) => {
  const { path, method, handler } = route;
  const middlewares = [];
  if (route.authenticated) {
    middlewares.push(checkSession);
  }
  if (route.schema) {
    middlewares.push(validateSchema(route.schema));
  }
  router[method.toLowerCase()](path, ...middlewares, handler);
});

module.exports = { routes, router };
