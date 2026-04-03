const Listing = require("../models/listing");

// Index Controller ------------
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render From For New Listing Controller --------------
module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

// Show Listing Controller -------------------
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash(
      "error",
      "Your requested listing is not available or does not exist"
    );
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// Create Listing Controller ------------------
module.exports.createListing = async (req, res, next) => {
  // const {title, description, image, price, location, country} = req.body;
  // const listing = req.body.listing;
  // console.log(listing);

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect("/listings");
};

// Render Edit Form Controller ---------------
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash(
      "error",
      "Your requested listing is not available or does not exist"
    );
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update Listing Controllers ---------------------
module.exports.updateListing = async (req, res) => {
  // console.log(req.body.listing);
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req.file != undefined) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};

// Delete Listing Controller ---------------------
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  //   console.log(deletedListing);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};

// Search Listing Controller -------------------------
module.exports.searchListing = async (req, res) => {
  // console.log(req.body);

  const results = await Listing.find({
    $or: [
      { title: { $regex: req.body.searchItem, $options: "i" } },
      { description: { $regex: req.body.searchItem, $options: "i" } },
      { category: { $regex: req.body.searchItem, $options: "i" } },
    ],
  });

  // console.log(results);
  res.render("listings/search.ejs", { results });
};

// Filter Listing Controller --------------------------
module.exports.filterListing = async (req, res) => {
  let { categoryname } = req.params;
  // console.log(categoryname);

  let filteredListing = await Listing.find({ category: categoryname });
  // console.log(filteredListing);

  res.render("listings/filter.ejs", { filteredListing });
};
