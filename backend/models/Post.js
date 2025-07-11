// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: String,
  imageUrl: String,
  caption: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", postSchema);
