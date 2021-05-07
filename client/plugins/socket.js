import { io } from "socket.io-client";

export default ({ app }, inject) => {
  const socket = io(process.env.API_URL);
  inject("socket", socket);
};
