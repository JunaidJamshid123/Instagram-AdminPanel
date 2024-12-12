import { useState } from "react";
import axios from "axios";

export default function AddAnnouncementForm({
  onClose,
  setAnnouncements,
  announcements,
  loggedInAdminId, // Pass the logged-in admin ID as a prop
}) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    createdBy: loggedInAdminId, // Use admin ID directly
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/announcements",
        formData
      );

      setAnnouncements([...announcements, response.data]);
      onClose();
    } catch (err) {
      setError("Error adding announcement: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Announcement</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
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
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            placeholder="Enter announcement content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Announcement"}
        </button>
      </form>
    </div>
  );
}
