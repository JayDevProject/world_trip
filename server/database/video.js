import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  file: [
    {
      fileId: { type: String, unique: true },
      title: { type: String, default: "[ 제목 없음 ]" },
      createAt: { type: String, default: Date.now },
      description: { type: String, default: "[ 영상 설명이 없습니다. ]" },
      public: { type: Boolean, default: true },
      videoFile: { type: String },
      like: { type: Number, default: 0 },
      comments: [
        {
          profileImg: { type: String },
          author: { type: String },
          text: { type: String },
          isDeleted: { type: Boolean, default: false },
          createAt: { type: String },
        },
      ],
    },
  ],
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
