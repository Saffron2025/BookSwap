import express from "express";
import Request from "../models/Request.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:bookId", protect, async (req, res) => {
  const request = await Request.create({
    book: req.params.bookId,
    requester: req.user.id
  });
  res.json(request);
});

router.get("/", protect, async (req, res) => {
  const requests = await Request.find({ requester: req.user.id }).populate("book");
  res.json(requests);
});

router.put("/:id", protect, async (req, res) => {
  const request = await Request.findById(req.params.id).populate("book");
  if (String(request.book.owner) !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  request.status = req.body.status;
  await request.save();
  res.json(request);
});

export default router;
