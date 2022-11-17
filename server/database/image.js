import mongoose from "mongoose";

const image = new mongoose.Schema({
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
    },
  ],
});

const Image = mongoose.model("Image", image);
export default Image;
