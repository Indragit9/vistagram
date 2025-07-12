const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });
const auth = require("../middleware/auth");

const {
  getAllPosts,
  likePost,
  sharePost,
  createPost,
} = require("../controllers/postController");

router.get("/", getAllPosts);
// router.post("/", upload.single("image"), createPost);
router.post("/", auth, upload.single("image"), createPost);

router.patch("/:id/like", likePost);
router.patch("/:id/share", sharePost);

module.exports = router;
