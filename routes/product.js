const express = require("express");
const router = express.Router();
const {
  validateProduct,
  isLoggedIn,
  isSeller,
  isProductAuthor,
} = require("../middleware");
const {
  showallProducts,
  productForm,
  newProduct,
  productDetails,
  editForm,
  editProduct,
  deleteProduct,
} = require("../controllers/product");

// Display a list of all products
router.get("/products", showallProducts);

// Show form to create new product
router.get("/product/new", isLoggedIn, isSeller, productForm);

// Add new product to database then redirect
router.post("/products", validateProduct, isLoggedIn, isSeller, newProduct);

// Show details about one specific product
router.get("/products/:id", isLoggedIn, productDetails);

// Show form to edit one product
router.get(
  "/products/:id/edit",
  isLoggedIn,
  isSeller,
  isProductAuthor,
  editForm
);

// Update product in database then redirect
router.patch(
  "/products/:id",
  validateProduct,
  isLoggedIn,
  isSeller,
  isProductAuthor,
  editProduct
);

// Delete product from database then redirect
router.delete(
  "/products/:id",
  isLoggedIn,
  isSeller,
  isProductAuthor,
  deleteProduct
);

module.exports = router;
