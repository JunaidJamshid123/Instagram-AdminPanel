const express = require("express");
const {
  createSegment,
  deleteSegment,
  addUserToSegment,
  removeUserFromSegment,
  updateSegment,
  getSegments,
  getSegmentById,
} = require("../controllers/userSegmentController");

const router = express.Router();

// Route to create a new segment
router.post("/", createSegment);

// Route to get all segments
router.get("/", getSegments);

// Route to get a segment by ID
router.get("/:id", getSegmentById);

// Route to update a segment
router.put("/:id", updateSegment);

// Route to delete a segment
router.delete("/:id", deleteSegment);

// Route to add a user to a segment
router.post("/:id/users", addUserToSegment);

// Route to remove a user from a segment
router.delete("/:id/users/:userId", removeUserFromSegment);

module.exports = router;
