const Comment = require("../models/commentSchema");

exports.addComment = async (req, res) => {
  try {
    const { userId, postId, text } = req.body;
    const comment = new Comment({ post: postId, user: userId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "username"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
