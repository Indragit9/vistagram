const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("../models/Post");
const seedData = require("./seedPosts.json");

dotenv.config();
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB.");

    // Optional: Clean old data
    await Post.deleteMany({});
    console.log("Cleared existing posts.");

    // Insert new data
    await Post.insertMany(seedData);
    console.log("Seeded database with posts!");

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
