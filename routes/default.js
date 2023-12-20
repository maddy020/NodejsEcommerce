const express = require("express");
const router = express.Router();

// Showing the default route page
router.get("/", (req, res) => {
  res.render("landingPage/landing");
});

module.exports = router;
