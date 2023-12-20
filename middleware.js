// Middleware for validating the product and reviews from the JOI schema - Server side validation

const { productSchema, reviewSchema } = require("./schema");
const Product = require("./models/Product");
const Review = require("./models/Reviews");

// Middleware for validating the product
const validateProduct = (req, res, next) => {
  const { img, name, price, desc } = req.body;
  const { error } = productSchema.validate({ img, name, price, desc }); // Return two object - error and value
  if (error) {
    res.status(500).send("Something went wrong in validating product", error);
  }
  next();
};

// Middleware for validating the review
const validateReview = (req, res, next) => {
  const { rating, comments } = req.body;
  const { error } = reviewSchema.validate({ rating, comments });
  if (error) {
    res.status(500).send("Something went wrong in validating review", error);
  }
  next();
};

// Middleware for checking the user is logged in or not
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please login first!");
    return res.redirect("/login");
  }
  next();
};

// Middleware for checking the user is seller or not
const isSeller = (req, res, next) => {
  if (!req.user.role) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect("/products");
  } else if (req.user.role !== "seller") {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect("/products");
  }
  next();
};

// Middleware for checking the user is author of the product or not
const isProductAuthor = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product.author.equals(req.user._id)) {
    req.flash("error", "You are not the author of this product!");
    return res.redirect("/products");
  }
  next();
};

// Middleware for checking the user is author of the review or not
const isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect("/products");
  }
  next();
};

module.exports = {
  validateProduct,
  validateReview,
  isLoggedIn,
  isSeller,
  isProductAuthor,
  isReviewAuthor,
};
