const Product = require("../models/Product");
const Review = require("../models/Review");
const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

// @route POST /api/products/:id/reviews
// @desc creating a review
// Access Private
router.post("/", protect, async (req, res) => {
  try {
    const { rating, body } = req.body;
    if (!rating || !body) return res.status(404).json({message: "Empty fields!"})
    const product = await Product.findById(req.params.id);
    const newReview = new Review({ rating, body });
    newReview.user = req.user._id;
    product.reviews.push(newReview);
    await newReview.save();
    await product.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id/reviews/:reviewId
// @desc deleting a review
// Access Private
router.delete("/:reviewId", protect, async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(201).json({message: "Review Deleted Successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router