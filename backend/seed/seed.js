const mongoose = require("mongoose");
const Post = require("../models/Post");
const seedPosts = require("./seedPosts.json");

mongoose.connect("mongodb://localhost:27017/vistagram")
  .then(async () => {
    await Post.deleteMany({});
    await Post.insertMany(seedPosts);
    console.log("Database seeded!");
    process.exit();
  })
  .catch(err => console.error(err));
