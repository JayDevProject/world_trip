import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  profileImg: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  imagePost: { type: String },
  isDeleted: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
