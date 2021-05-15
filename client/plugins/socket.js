import { io } from "socket.io-client";
import * as gamesListeners from "../listeners/games";

export default ({ app, store }, inject) => {
  const socket = io(process.env.API_URL, { withCredentials: true });
  registerListeners(socket, store, gamesListeners);
  inject("socket", socket);
};

function registerListeners(socket, store, listeners) {
  Object.keys(listeners).forEach((listernerName) => {
    const listener = listeners[listernerName];
    listener(socket, store);
  });
}
