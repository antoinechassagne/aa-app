const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const createRouter = require("./router");

const app = express();
const router = createRouter();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use("/", router);
app.get("/", (req, res) => res.send("API is running 🎲"));
app.use(express.static("static", { dotfiles: "allow" }));

module.exports = app;
