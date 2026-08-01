const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { populate } = require("../models/review.js");
 
const listingController = require("../controllers/listings.js");


// index route
// index route
router.route("/")
    .get(wrapAsync(listingController.index)) // Removed the "/"
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing)); // Removed the "/"
    .post((req,res)=> {
        res.send(req.body);
    });

    
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

// Edit route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.rendorEditForm));


module.exports = router;