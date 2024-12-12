import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EditAnnouncementForm({
  selectedAnnouncement,
  onClose,
  setAnnouncements,
  announcements,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedAnnouncement) {
      setTitle(selectedAnnouncement.title);
      setContent(selectedAnnouncement.content);
      setImage(selectedAnnouncement.image || "");
    }
  }, [selectedAnnouncement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/announcements/${selectedAnnouncement._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update announcement");
      }

      const updatedAnnouncement = await response.json();

      setAnnouncements(
        announcements.map((announcement) =>
          announcement._id === updatedAnnouncement._id
            ? updatedAnnouncement
            : announcement
        )
      );
      onClose();
    } catch (error) {
      console.error("Error updating announcement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          rows="4"
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}

EditAnnouncementForm.propTypes = {
  selectedAnnouncement: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired,
};
