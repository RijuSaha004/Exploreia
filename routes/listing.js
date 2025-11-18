const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateSearch,
} = require("../middlware.js");

const {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  destroyListing,
  searchListing,
  filterListing,
} = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudinary.js");
const Listing = require("../models/listing.js");
const upload = multer({ storage });

// Index Route ------------------>
// New Listing\create Route ------------>
router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListing)
  );

// New Listing Form Route -------->
router.get("/new", isLoggedIn, wrapAsync(renderNewForm));

// Search Listings -------------->
router.post("/search", validateSearch, wrapAsync(searchListing));

// Show Route ------------------->
// Update Route ------------------->
// Delete Route ------------------->
router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListing));

// Edit Listing form Route -------------->
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(renderEditForm));

// Filter Listing Route ------------------>
router.get("/filter/:categoryname", wrapAsync(filterListing));

module.exports = router;
