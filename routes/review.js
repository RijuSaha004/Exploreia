const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlware.js");

const { createReview, destroyReview } = require("../controllers/review.js");

const router = express.Router({ mergeParams: true });

// Reviews
// Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReview)
);

module.exports = router;
