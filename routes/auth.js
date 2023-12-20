const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  signupForm,
  registerUser,
  loginForm,
  userLogin,
  userLogout,
} = require("../controllers/auth");

// To show the sign up form
router.get("/signup", signupForm);

// to actually want to register a user to the database
router.post("/signup", registerUser);

// To show the login form
router.get("/login", loginForm);

// To actually login a user via database
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  userLogin
);

// Logout the user
router.get("/logout", userLogout);

module.exports = router;
