const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlware.js");

const {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  logout,
} = require("../controllers/user.js");

// Signup Form ------------------
// Signup User Route -------------
router.route("/signup").get(renderSignupForm).post(wrapAsync(signup));

// Login Form --------------------
// Login User Route ---------------
router
  .route("/login")
  .get(renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
  );

// Logout User Route -----------------
router.get("/logout", logout);

module.exports = router;
