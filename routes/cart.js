const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const { showCart, addToCart, removefromCart } = require("../controllers/cart");

// To show the cart of the individual user
router.get("/user/cart", isLoggedIn, showCart);

// To actually add the product to the cart for a particular user
router.post("/user/:productId/add", isLoggedIn, addToCart);

// To actually remove the product from the cart for a particular user
router.delete("/user/:productId/remove", isLoggedIn, removefromCart);

module.exports = router;
