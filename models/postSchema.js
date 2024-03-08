const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caption: String,
  imageUrls: [String], // URLs of images stored in S3
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
