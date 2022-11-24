import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: { type: String, unique: true },
  password: { type: String },
  nickname: { type: String, unique: true },
  email: { type: String, unique: true },
  profileImg: {
    type: String,
    default: "https://chocobean.co.kr/common/img/default_profile.png",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const User = mongoose.model("User", userSchema);
export default User;
