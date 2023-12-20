const express = require("express");
const router = express.Router();
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const { postReviews, deleteReviews } = require("../controllers/reviews");

// Post all the reviews for a particular product - using middleware for validation
router.post("/product/:id/review", validateReview, isLoggedIn, postReviews);

// Delete a particular review for a particular product - using middleware for validation
router.delete(
  "/product/:id/review/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  deleteReviews
);

module.exports = router;
