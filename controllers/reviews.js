const Product = require("../models/Product");
const Review = require("../models/Reviews");

const postReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comments } = req.body;
    const review = await Review.create({
      rating,
      comments,
      author: req.user._id,
    });
    await Product.findByIdAndUpdate(id, { $push: { reviews: review._id } });
    // const product = await Product.findById(id);
    // product.reviews.push(review);
    // await product.save();
    req.flash("success", "Successfully created a new review");
    res.redirect(`/products/${id}`);
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in post all the reviews route", error);
  }
};

const deleteReviews = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/products/${id}`);
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in post all the reviews route", error);
  }
};

module.exports = { postReviews, deleteReviews };
