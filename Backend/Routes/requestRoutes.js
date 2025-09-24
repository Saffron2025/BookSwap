const express = require("express");
const Request = require("../models/Request");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create request
router.post("/:bookId", protect, async (req, res) => {
  const request = await Request.create({
    book: req.params.bookId,
    requester: req.user.id
  });
  res.json(request);
});

// Get all requests for logged-in user
router.get("/", protect, async (req, res) => {
  const requests = await Request.find({ requester: req.user.id }).populate("book");
  res.json(requests);
});

// Update request status (only owner can update)
router.put("/:id", protect, async (req, res) => {
  const request = await Request.findById(req.params.id).populate("book");
  if (String(request.book.owner) !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  request.status = req.body.status;
  await request.save();
  res.json(request);
});

module.exports = router;
