import mongoose from "mongoose";

try {
  mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("✅ Connected to DB");
} catch (error) {
  console.log("❌ DB Error: ", error);
}
