const express = require("express");
const {
  getAllUsers,
  searchUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Search users by query (username or email)
router.get("/search", searchUsers);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

module.exports = router;
