const express = require("express");
const {
  getAllAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  getAnnouncementById,
} = require("../controllers/announcementController");

const router = express.Router();

// Get all announcements
router.get("/", getAllAnnouncements);

// Add a new announcement
router.post("/", addAnnouncement);

// Delete an announcement
router.delete("/:id", deleteAnnouncement);

// Edit an announcement
router.put("/:id", editAnnouncement);

// View a particular announcement
router.get("/:id", getAnnouncementById);

module.exports = router;
