const User = require("../models/User");
const Post = require("../models/Post");
const Announcement = require("../models/Announcement");

exports.getAnalytics = async (req, res) => {
  try {
    // Fetch total users
    const totalUsers = await User.countDocuments();

    // Fetch total posts
    const totalPosts = await Post.countDocuments();

    // Fetch total announcements
    const totalAnnouncements = await Announcement.countDocuments();

    // Fetch total user segments (Admin and Regular Users)
    const totalAdmins = await User.countDocuments({ isAdmin: true });
    const totalRegularUsers = totalUsers - totalAdmins;

    // Calculate user engagement
    const allPosts = await Post.find();
    const totalLikes = allPosts.reduce((acc, post) => acc + post.likes.length, 0);
    const totalComments = allPosts.reduce((acc, post) => acc + post.comments.length, 0);

    // Calculate engagement percentages
     likePercentage = totalLikes / (totalPosts || 1) * 100; // Avoid division by zero
     commentPercentage = totalComments / (totalPosts || 1) * 100;
     const engagementRate = (likePercentage + commentPercentage)/2;

    // Response
    res.status(200).json({
      totalUsers,
      totalAdmins,
      totalRegularUsers,
      totalPosts,
      totalAnnouncements,
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
