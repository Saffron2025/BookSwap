const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const requestRoutes = require("./routes/requestRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/requests", requestRoutes);

app.get("/ping", (req, res) => {
  res.status(200).json({ ok: true, msg: "pong 🟢" });
});

app.get("/", (req, res) => res.send("API Running"));

// Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
