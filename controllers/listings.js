const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create the listings!");
        return res.redirect("/login");
    }
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    console.log(listing);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");  // ✅ return added + fixed spelling
    }
    console.log("/listings");
    res.render("listings/show", { listing });
};

// module.exports.createListing = async (req,res,next)=>
// {
//     // let {title,description,image,price,country,location} = req.body;
//     // let listing = req.body.listing

//        const newListing =  new Listing(req.body.listing);
//        newListing.owner = req.user._id;
//       await newListing.save();
//       req.flash("success" , "new Listings careted!");
//       res.redirect("/listings");

// };


module.exports.createListing = async (req, res, next) => {

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = "/uploads/" + req.file.filename;
    }

    await newListing.save();

    req.flash("success", "New Listing created!");

    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listings deleted!");
    console.log(deletedListings);
    res.redirect('/listings');
};
