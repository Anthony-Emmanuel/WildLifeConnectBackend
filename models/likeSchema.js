const likeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
