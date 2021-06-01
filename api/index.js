const app = require("./app");

app.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`);
});
