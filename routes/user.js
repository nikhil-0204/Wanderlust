const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saverRedirectUrl} = require("../middleware.js");

const userContorller = require("../controllers/users.js");

router.route("/signup")
.get(userContorller.renderSignupForm)
.post(wrapAsync(userContorller.singup));

router.route("/login")
.get(userContorller.renderLoginForm)
.post(saverRedirectUrl,passport.authenticate("local", {failureRedirect:'/login',failureFlash:true}),userContorller.logout);

router.get("/logout",userContorller.login);

module.exports = router;