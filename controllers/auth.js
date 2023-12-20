const User = require("../models/User");

const signupForm = (req, res) => {
  try {
    res.render("auth/signup");
  } catch (error) {
    res.status(500).send("Something went wrong in get signup route", error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const user = new User({ email, username, role });
    const newUser = await User.register(user, password); // register is a passport-local-mongoose method
    // req.flash("success", "You are successfully registered, Please login!");
    // res.redirect("/login"); - this is the normal way to redirect but
    // when user already registered, we want to login them automatically
    req.login(newUser, (error) => {
      if (error) {
        return next(error);
      } else {
        req.flash("success", "Welcome back!");
        res.redirect("/products");
      }
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

const loginForm = (req, res) => {
  try {
    res.render("auth/login");
  } catch (error) {
    res.status(500).send("Something went wrong in get login route", error);
  }
};

const userLogin = (req, res) => {
  try {
    req.flash("success", "Welcome back!");
    res.redirect("/products");
  } catch (error) {
    res.status(500).send("Something went wrong in post login route", error);
  }
};

const userLogout = (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Goodbye! See you again");
      res.redirect("/login");
    });
  } catch (error) {
    res.status(500).send("Something went wrong in get logout route", error);
  }
};

module.exports = { signupForm, registerUser, loginForm, userLogin, userLogout };
