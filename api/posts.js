const express = require("express");
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
  console.log("A request is being made to the posts route");
  next();
});

const { getAllPosts } = require("../db");

postsRouter.get("/", async (req, res, next) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});

module.exports = postsRouter;
