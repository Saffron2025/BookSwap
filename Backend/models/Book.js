import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  condition: String,
  imageURL: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Book", bookSchema);
