// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // Register route
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "User registration failed", details: err.message });
//   }
// });

// // Login route
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({ token, username: user.username });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed", details: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Signup
// router.post("/signup", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const exists = await User.findOne({ username });
//     if (exists) return res.status(400).json({ message: "User already exists." });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//     res.status(201).json({ token, username });
//   } catch (err) {
//     res.status(500).json({ message: "Signup failed", error: err.message });
//   }
// });

router.post("https://vistagram-cgf0.onrender.com/api/signup", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const exists = await User.findOne({ username });
      if (exists) return res.status(400).json({ message: "User already exists." });
  
      const user = new User({ username, password }); // ✅ let model handle hashing
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ token, username });
    } catch (err) {
      res.status(500).json({ message: "Signup failed", error: err.message });
    }
  });
  
// Login
router.post("https://vistagram-cgf0.onrender.com/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, username });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;

