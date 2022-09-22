import mongoose from "mongoose";

const image = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  file: [
    {
      // country: { type: String },
      title: { type: String, default: "" },
      createAt: { type: String, default: Date.now },
      comment: { type: String, default: "" },
      public: { type: Boolean, default: true },
      imageFile: [{ type: String }],
    },
  ],
});

const Image = mongoose.model("Image", image);
export default Image;
