const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require("../middleware/authenticateToken");

// Secure the route with the authentication middleware
router.post(
  "/create",
  authenticateToken,
  postController.uploadImageToS3,
  postController.createPost
);

router.get("/get", postController.getPosts);

router.get("/get/:username", postController.getUserPosts);

module.exports = router;
