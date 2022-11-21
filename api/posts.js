const express = require("express");
const postsRouter = express.Router();
const { requireUser } = require("./utils");
const { createPost } = require("../db");

postsRouter.post("/", async (req, res, next) => {
  const posts = await createPost();

  res.send({
    posts,
  });
});

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    // add authorId, title, content to postData object
    // const post = await createPost(postData);
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object
  } catch ({ name, message }) {
    next({ name, message });
  }
});

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
