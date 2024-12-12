const User = require("../models/User");
const Post = require("../models/Post");
const Announcement = require("../models/Announcement");
const UserSegment = require("../models/UserSegment"); // Import UserSegment model

// Function to fetch analytics data
const getAnalytics = async (req, res) => {
  try {
    // Fetch total users
    const totalUsers = await User.countDocuments();

    // Fetch total posts
    const totalPosts = await Post.countDocuments();

    // Fetch total announcements
    const totalAnnouncements = await Announcement.countDocuments();

    // Fetch total user segments
    const totalUserSegments = await UserSegment.countDocuments();

    // Fetch total user segments (Admin and Regular Users)
    const totalAdmins = await User.countDocuments({ isAdmin: true });
    const totalRegularUsers = totalUsers - totalAdmins;

    // Calculate user engagement
    const allPosts = await Post.find();
    const totalLikes = allPosts.reduce((acc, post) => acc + post.likes.length, 0);
    const totalComments = allPosts.reduce((acc, post) => acc + post.comments.length, 0);

    // Calculate engagement percentages
    const likePercentage = (totalLikes / (totalPosts || 1)) * 100; // Avoid division by zero
    const commentPercentage = (totalComments / (totalPosts || 1)) * 100;
    const engagementRate = (likePercentage + commentPercentage) / 2;

    res.status(200).json({
      totalUsers,
      totalAdmins,
      totalRegularUsers,
      totalPosts,
      totalAnnouncements,
      totalUserSegments,
      userEngagement: {
        totalLikes,
        totalComments,
        engagementRate: engagementRate.toFixed(2), // Two decimal places
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Error fetching analytics" });
  }
};

// Function to fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Function to fetch all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Function to fetch all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Error fetching announcements" });
  }
};

// Function to fetch all user segments
const getAllUserSegments = async (req, res) => {
  try {
    const userSegments = await UserSegment.find();
    res.status(200).json(userSegments);
  } catch (error) {
    console.error("Error fetching user segments:", error);
    res.status(500).json({ error: "Error fetching user segments" });
  }
};

module.exports = {
  getAnalytics,
  getAllUsers,
  getAllPosts,
  getAllAnnouncements,
  getAllUserSegments,
};