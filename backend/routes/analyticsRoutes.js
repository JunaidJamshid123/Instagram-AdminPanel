const express = require("express");
const { getAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

// Route to fetch all analytics
router.get("/", getAnalytics);

module.exports = router;
