const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { checkRouteSession } = require("./middlewares/checkSession");
const validateSchema = require("./middlewares/validateSchema");

module.exports = function () {
  const modulesPath = `${__dirname}/modules`;
  const modules = fs.readdirSync(path.resolve(`${__dirname}/modules`));
  modules.map((moduleName) => {
    const modulePath = `${modulesPath}/${moduleName}`;
    const moduleFileNames = fs.readdirSync(path.resolve(modulePath));
    if (moduleFileNames.includes("routes.js")) {
      const routesPath = `${modulePath}/routes.js`;
      const routes = require(path.resolve(routesPath));
      registerRoutes(routes);
    }
  });
  return router;
};

function registerRoutes(routes) {
  routes.forEach((route) => {
    const { path, method, handler } = route;
    const middlewares = [];
    if (route.authenticated) {
      middlewares.push(checkRouteSession);
    }
    if (route.schema) {
      middlewares.push(validateSchema(route.schema));
    }
    router[method.toLowerCase()](path, ...middlewares, handler);
  });
}
