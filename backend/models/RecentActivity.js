const mongoose = require("mongoose");

const recentActivitySchema = new mongoose.Schema(
  {
    activityName: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, enum: ["Login", "Post", "Comment", "Follow", "Like", "Share", "Other"] },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecentActivity", recentActivitySchema);
