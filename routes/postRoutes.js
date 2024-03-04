const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.uploadImageToS3, postController.createPost);

// // Need to implement
// router.get("/user/:userId", postController.getPostsByUser);

module.exports = router;
