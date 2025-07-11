// controllers/postController.js
const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 }); // reverse chronological
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

const likePost = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body; // type: "like" or "unlike"
  
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      if (type === "like") post.likes += 1;
      else if (type === "unlike" && post.likes > 0) post.likes -= 1;
  
      await post.save();
      res.status(200).json({ message: `Post ${type}d successfully`, likes: post.likes });
    } catch (err) {
      res.status(500).json({ message: "Error liking post", error: err.message });
    }
  };
  
  // PATCH: Increment share count
  const sharePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      post.shares += 1;
      await post.save();
  
      res.status(200).json({ message: "Post shared", shares: post.shares });
    } catch (err) {
      res.status(500).json({ message: "Error sharing post", error: err.message });
    }
  };

  const createPost = async (req, res) => {
    try {
      console.log("Received POST request to create post");
      console.log("Body:", req.body);
      console.log("File:", req.file);
  
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded." });
      }
  
      const { caption } = req.body;
      const image = req.file.path;
  
      const newPost = new Post({
        username: "anonymous",
        caption,
        image,
        timestamp: new Date(),
        likes: 0,
        shares: 0,
      });
  
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      console.error("Upload failed:", err);
      res.status(500).json({ message: "Failed to upload post", error: err.message });
    }
  };
  
  
  
  module.exports = {
    getAllPosts,
    likePost,
    sharePost,
    createPost,
  };