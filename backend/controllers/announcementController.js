const Announcement = require("../models/Announcement");

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Error fetching announcements", details: error.message });
  }
};

// Add a new announcement
exports.addAnnouncement = async (req, res) => {
  try {
    const { title, content, image, createdBy } = req.body;

    const newAnnouncement = new Announcement({ title, content, image, createdBy });
    const savedAnnouncement = await newAnnouncement.save();

    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(400).json({ error: "Error adding announcement", details: error.message });
  }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting announcement", details: error.message });
  }
};

// Edit an announcement
exports.editAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, content, image, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(400).json({ error: "Error updating announcement", details: error.message });
  }
};

// View a particular announcement
exports.getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: "Error fetching announcement", details: error.message });
  }
};
