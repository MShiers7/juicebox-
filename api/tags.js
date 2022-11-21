const express = require("express");
const tagsRouter = express.Router();
const { getAllTags } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made in the tags route");
  next();
});

// api/tags
tagsRouter.get("/", async (req, res, next) => {
  const tags = await getAllTags();
  res.send({
    tags,
  });
});

module.exports = tagsRouter;
