import mongoose from "mongoose";

const user = mongoose.Schema({
  userId: { type: String, unique: true },
  password: { type: String },
  nickname: { type: String, unique: true },
  email: { type: String, unique: true },
  profileImage: { type: String },
});

const User = mongoose.model("User", user);
export default User;
