const express = require("express");
const Book = require("../models/Book");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add book
router.post("/", protect, async (req, res) => {
  const book = await Book.create({ ...req.body, owner: req.user.id });
  res.json(book);
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find().populate("owner", "username");
  res.json(books);
});

// Delete book
router.delete("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (String(book.owner) !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await book.deleteOne();
    res.json({ msg: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
