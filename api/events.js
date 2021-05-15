const fs = require("fs");
const path = require("path");

module.exports = function (io, socket) {
  const modulesPath = `${__dirname}/modules`;
  const modules = fs.readdirSync(path.resolve(`${__dirname}/modules`));
  modules.map((moduleName) => {
    const modulePath = `${modulesPath}/${moduleName}`;
    const moduleFileNames = fs.readdirSync(path.resolve(modulePath));
    if (moduleFileNames.includes("listeners.js")) {
      const listenersPath = `${modulePath}/listeners.js`;
      const listeners = require(path.resolve(listenersPath));
      registerListeners(io, socket, listeners);
    }
  });
};

function registerListeners(io, socket, listeners) {
  Object.keys(listeners).map((listenerName) => {
    const listener = listeners[listenerName];
    listener(io, socket);
  });
}
