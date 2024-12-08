const UserSegment = require("../models/UserSegment");
const User = require("../models/User");

// Create a new segment
exports.createSegment = async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;

    const newSegment = new UserSegment({ name, description, createdBy });
    const savedSegment = await newSegment.save();

    res.status(201).json(savedSegment);
  } catch (error) {
    console.error("Error creating segment:", error);
    res.status(500).json({ error: "Failed to create segment" });
  }
};

// Get all segments
exports.getSegments = async (req, res) => {
  try {
    const segments = await UserSegment.find();
    res.status(200).json(segments);
  } catch (error) {
    console.error("Error fetching segments:", error);
    res.status(500).json({ error: "Failed to fetch segments" });
  }
};

// Get a segment by ID
exports.getSegmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const segment = await UserSegment.findById(id);

    if (!segment) {
      return res.status(404).json({ error: "Segment not found" });
    }

    res.status(200).json(segment);
  } catch (error) {
    console.error("Error fetching segment:", error);
    res.status(500).json({ error: "Failed to fetch segment" });
  }
};

// Update a segment
exports.updateSegment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedSegment = await UserSegment.findByIdAndUpdate(id, { name, description, updatedAt: Date.now() }, { new: true });

    if (!updatedSegment) {
      return res.status(404).json({ error: "Segment not found" });
    }

    res.status(200).json(updatedSegment);
  } catch (error) {
    console.error("Error updating segment:", error);
    res.status(500).json({ error: "Failed to update segment" });
  }
};

// Delete a segment
exports.deleteSegment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSegment = await UserSegment.findByIdAndDelete(id);

    if (!deletedSegment) {
      return res.status(404).json({ error: "Segment not found" });
    }

    res.status(200).json({ message: "Segment deleted successfully", deletedSegment });
  } catch (error) {
    console.error("Error deleting segment:", error);
    res.status(500).json({ error: "Failed to delete segment" });
  }
};

// Add a user to a segment
exports.addUserToSegment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const segment = await UserSegment.findById(id);

    if (!segment) {
      return res.status(404).json({ error: "Segment not found" });
    }

    if (segment.users.includes(userId)) {
      return res.status(400).json({ error: "User already in the segment" });
    }

    segment.users.push(userId);
    await segment.save();

    res.status(200).json({ message: "User added to segment", segment });
  } catch (error) {
    console.error("Error adding user to segment:", error);
    res.status(500).json({ error: "Failed to add user to segment" });
  }
};

// Remove a user from a segment
exports.removeUserFromSegment = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const segment = await UserSegment.findById(id);

    if (!segment) {
      return res.status(404).json({ error: "Segment not found" });
    }

    const userIndex = segment.users.indexOf(userId);
    if (userIndex === -1) {
      return res.status(400).json({ error: "User not found in the segment" });
    }

    segment.users.splice(userIndex, 1);
    await segment.save();

    res.status(200).json({ message: "User removed from segment", segment });
  } catch (error) {
    console.error("Error removing user from segment:", error);
    res.status(500).json({ error: "Failed to remove user from segment" });
  }
};
