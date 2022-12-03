import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: { type: String },
  password: { type: String },
  nickname: { type: String },
  email: { type: String },
  profileImg: {
    type: String,
    default: "default_profile.png",
  },
  introduce: { type: String, default: "[ 입력된 소개글이 없습니다. ]" },
  like: [
    {
      fileId: { type: String, unique: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
