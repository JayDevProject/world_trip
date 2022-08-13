import mongoose from "mongoose";

try {
  mongoose.connect("mongodb://127.0.0.1:27017/trip", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Connected to DB");
} catch (error) {
  console.log("❌ DB Error: ", error);
}
