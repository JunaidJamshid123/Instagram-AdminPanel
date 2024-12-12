const express = require("express");
const { 
  getAnalytics, 
  getAllUsers, 
  getAllPosts, 
  getAllAnnouncements, 
  getAllUserSegments 
} = require("../controllers/analyticsController");

const router = express.Router();

// Route to fetch all analytics
router.get("/analytics", getAnalytics);

// Route to fetch all users
router.get("/users", getAllUsers);

// Route to fetch all posts
router.get("/posts", getAllPosts);

// Route to fetch all announcements
router.get("/announcements", getAllAnnouncements);

// Route to fetch all user segments
router.get("/user-segments", getAllUserSegments);

module.exports = router;
