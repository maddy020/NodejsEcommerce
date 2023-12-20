const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const {
  productCheckout,
  successPage,
  failurePage,
} = require("../controllers/payment");

// Send checkout request to stripe using post request
router.post("/product/checkout", isLoggedIn, productCheckout);

// After successfull payment - redirect to success page
router.get("/success", isLoggedIn, successPage);

// After unsuccessfull payment - redirect to failure page
router.get("/cancel", isLoggedIn, failurePage);

module.exports = router;
