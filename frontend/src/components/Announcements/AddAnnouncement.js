import { useState } from "react";

export default function AddAnnouncementForm({
  editMode,
  selectedAnnouncement,
  onClose,
  setAnnouncements,
  announcements,
}) {
  const [formData, setFormData] = useState({
    title: selectedAnnouncement?.title || "",
    content: selectedAnnouncement?.content || "",
    author: selectedAnnouncement?.author || "",
    status: selectedAnnouncement?.status || "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === selectedAnnouncement.id
            ? { ...announcement, ...formData }
            : announcement
        )
      );
    } else {
      setAnnouncements([
        ...announcements,
        { id: `A${announcements.length + 1}`, ...formData },
      ]);
    }
    onClose();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {editMode ? "Edit Announcement" : "Add New Announcement"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter announcement title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            placeholder="Enter announcement content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            placeholder="Enter author name"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
        >
          {editMode ? "Update Announcement" : "Create Announcement"}
        </button>
      </form>
    </div>
  );
}
