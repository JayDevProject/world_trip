import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  file: [
    {
      fileId: { type: String, unique: true, default: "" },
      title: { type: String, default: "[ 제목 없음 ]" },
      createAt: { type: String, default: Date.now },
      description: { type: String, default: "[ 영상 설명이 없습니다. ]" },
      public: { type: Boolean, default: true },
      imageFile: [{ type: String }],
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

const Image = mongoose.model("Image", imageSchema);
export default Image;
