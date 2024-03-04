const Like = require("../models/likeSchema");

exports.likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const like = new Like({ post: postId, user: userId });
    await like.save();
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await Like.findOneAndDelete({ post: postId, user: userId });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
