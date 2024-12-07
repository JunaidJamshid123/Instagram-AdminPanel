const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// Routes
router.get("/", getAllPosts); // Get all posts
router.get("/:id", getPostById); // Get a specific post by ID
router.post("/", createPost); // Create a new post
router.put("/:id", updatePost); // Update a specific post by ID
router.delete("/:id", deletePost); // Delete a specific post by ID

module.exports = router;
