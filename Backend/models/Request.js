import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" }
});

export default mongoose.model("Request", requestSchema);
