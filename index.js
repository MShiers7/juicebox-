// inside index.js
const PORT = 3000;
const express = require("express");
const apiRouter = require("./api");
const server = express();
const morgan = require("morgan");
const { client } = require("./db");
client.connect();

server.use(morgan("dev"));

server.use(express.json());

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use("/api", apiRouter);

server.use("/api", (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

server.get("/api", (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({ message: "success" });
});
