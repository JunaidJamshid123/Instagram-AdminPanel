const express = require("express");
const {
  createSegment,
  getSegments,
  getSegmentById,
  updateSegment,
  deleteSegment,
  addUserToSegment,
  removeUserFromSegment,
} = require("../controllers/userSegmentController");

const router = express.Router();

router.post("/", createSegment); // POST route for creating a segment
router.get("/", getSegments); // GET all segments
router.get("/:id", getSegmentById); // GET a segment by ID
router.put("/:id", updateSegment); // PUT to update a segment
router.delete("/:id", deleteSegment); // DELETE to remove a segment
router.post("/:id/users", addUserToSegment); // Add a user to a segment
router.delete("/:id/users/:userId", removeUserFromSegment); // Remove user from a segment

module.exports = router;
