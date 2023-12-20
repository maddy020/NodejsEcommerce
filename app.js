require("dotenv").config();

const express = require("express");
const app = express();

/*======================= Connecting to the database ===============================*/

const mongoose = require("mongoose");
const MONGODBURL = process.env.MONGODBURL;
const PORT = process.env.PORT || 5050;

mongoose
  .connect(MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on PORT 5050");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

/*======================= Setting the view engine and the public folder ===============================*/

const path = require("path");
const ejsmate = require("ejs-mate");

app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// Middleware for the public folder
app.use(express.static(path.join(__dirname, "/public")));
// Middleware for the form data
app.use(express.urlencoded({ extended: true }));

/*======================= Middleware for the method override ========================*/

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

/*======================= Setting the express-session and flash message ===============================*/

const flash = require("connect-flash");
const session = require("express-session");
const SECRET = process.env.SECRET;

const configSession = {
  name: "E-commerce",
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
// Middleware for the express-session
app.use(session(configSession));
// Middleware for the flash message or popup
app.use(flash());

/*======================= Passport used for authorization and authentication ===============================*/

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

// Middleware for the passport
app.use(passport.initialize());
// Middleware for the passport session
app.use(passport.session());
// Serialize the user
passport.serializeUser(User.serializeUser());
// Deserialize the user
passport.deserializeUser(User.deserializeUser());
// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
// Custom middleware for storing the flash message or popup and the current User - increase reusability of the flash mesaage
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

/*========================= Seeding the database only once =============================*/
const seedDB = require("./seed");
// seedDB();

/*======================= Middleware for the body-parser - used in Stripe Payment integration ===============================*/

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

/*======================= Routes required for the application ===============================*/

const productRoute = require("./routes/product");
const reviewRoute = require("./routes/reviews");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const defaultRoute = require("./routes/default");
const paymentRoute = require("./routes/payment");

// Middleware for products-routes to render on each incoming request
app.use(defaultRoute);
// Middleware for products-routes to render on each incoming request
app.use(productRoute);
// Middleware for reviews-routes to render on each incoming request
app.use(reviewRoute);
// Middleware for auth-routes to render on each incoming request
app.use(authRoute);
// Middleware for cart-routes to render on each incoming request
app.use(cartRoute);
// Middleware for payment-routes to render on each incoming request
app.use(paymentRoute);
