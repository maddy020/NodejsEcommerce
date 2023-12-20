const mongoose = require("mongoose");
const Review = require("./Reviews");

// Create a schema for products
const productSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  desc: {
    type: String,
    trim: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Actual implementation of deleting reviews associated with a product
// It uses a post middleware to delete all reviews associated with the product
// post middleware is used because findByIdAndDelete() is used to delete the product
// Behind the scenes, findByIdAndDelete() uses findOneAndDelete() which is a query middleware
productSchema.post("findOneAndDelete", async (product) => {
  if (product.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: product.reviews } });
  }
});

// Create a model for products schema
let Product = mongoose.model("Product", productSchema);
module.exports = Product;
