import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  file: [
    {
      // country: { type: String },
      fileId: { type: String, unique: true, default: "" },
      title: { type: String, default: "" },
      createAt: { type: String, default: Date.now },
      description: { type: String, default: "" },
      public: { type: Boolean, default: true },
      imageFile: [{ type: String }],
      comments: [
        {
          profileImg: { type: String },
          author: { type: String },
          text: { type: String },
          isDeleted: { type: Boolean, default: false },
          createAt: { type: Date },
        },
      ],
    },
  ],
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
