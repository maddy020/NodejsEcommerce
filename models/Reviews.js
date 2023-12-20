const mongoose = require("mongoose");

// Create a schema for reviews
const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  comments: {
    type: String,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create a model for reviews schema
let Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
