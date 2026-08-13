const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); // Just once

    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save(); // Saves to 'reviews' collection
    await listing.save();   // Updates 'listings' collection

    req.flash("success", "New review created!");
    res.redirect(`/listings/${listing._id}`); // Fixed typo
};

module.exports.destroyReview = async (req, res) => { // Fixed spelling
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};
