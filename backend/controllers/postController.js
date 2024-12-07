const Post = require("../models/Post");

// Get all posts
// Get all posts without populating related fields
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch posts without populate
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts", details: error.message });
  }
};


// Get a particular post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the post", details: error.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { user, caption, image } = req.body;
  try {
    const newPost = new Post({ user, caption, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating the post", details: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { caption, image } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { caption, image, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating the post", details: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the post", details: error.message });
  }
};
