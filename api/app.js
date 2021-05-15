const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const socketio = require("socket.io");
const createApiRouter = require("./router");
const checkSessionSocket = require("./middlewares/checkSessionSocket");
const attachListenersToSocket = require("./events");

/* Express API */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use("/", createApiRouter());
app.get("/", (req, res) => res.send("API is running 🎲"));

/* Server */
const server = http.Server(app);

/* Websocket events */
const io = socketio(server, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
  transports: ["websocket", "polling"],
});

io.use(checkSessionSocket);
io.on("connection", (socket) => {
  attachListenersToSocket(io, socket);
});

module.exports = { server, app, io };
