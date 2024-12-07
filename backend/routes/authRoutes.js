const express = require("express");
const { signup, login } = require("../controllers/authController"); // Import signup and login controllers
const router = express.Router();

// POST request to register a new user
router.post("/signup", signup);

// POST request to log in an existing user
router.post("/login", login);

module.exports = router;
