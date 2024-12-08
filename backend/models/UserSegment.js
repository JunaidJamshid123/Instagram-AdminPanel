const mongoose = require("mongoose");

const userSegmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // Name of the segment
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user references
    description: { type: String, maxlength: 300, trim: true }, // Optional description of the segment
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Admin who created the segment
    createdAt: { type: Date, default: Date.now }, // Creation timestamp
    updatedAt: { type: Date }, // Last update timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSegment", userSegmentSchema);
