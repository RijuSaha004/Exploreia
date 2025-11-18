const User = require("../models/user");

module.exports.renderSignupForm = async (req, res) => {
  res.render("users/signup.ejs");
};

// Signup User Controller ---------------------
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Exploreia");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = async (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Exploreia");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  return res.redirect(redirectUrl);
};

module.exports.logout = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      req.logout((err) => (err ? reject(err) : resolve()));
    });
    req.flash("success", "You are logged out");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};
