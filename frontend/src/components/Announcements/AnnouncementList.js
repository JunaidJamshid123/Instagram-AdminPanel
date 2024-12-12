import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EditAnnouncementForm from "./EditAnnouncement";
import AddAnnouncementForm from "./AddAnnouncement";

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Fetch logged-in admin ID from localStorage or fallback
  const [loggedInAdminId, setLoggedInAdminId] = useState(null);
  useEffect(() => {
    const adminFromSession = localStorage.getItem("user"); // Assuming "user" contains admin info
    if (adminFromSession) {
      const parsedAdmin = JSON.parse(adminFromSession);
      setLoggedInAdminId(parsedAdmin.id || "fallbackAdminId"); // Replace fallback with proper logic
    }
  }, []);

  // Fetch announcements from the backend API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/announcements");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch users data to map createdBy to username
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Get the username by userId
  const getUsernameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : "Unknown User";
  };

  const handleEdit = (announcement) => {
    setEditMode(true);
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const handleAddNewAnnouncement = () => {
    setEditMode(false);
    setSelectedAnnouncement(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: "DELETE",
      });
      setAnnouncements(announcements.filter((announcement) => announcement._id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Announcement Management</h1>
          <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-4 sm:gap-0">
            <input
              placeholder="Search announcements..."
              className="pl-4 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 w-full sm:max-w-md"
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
              onClick={handleAddNewAnnouncement}
            >
              Add New Announcement
            </button>
          </div>
        </div>

        {/* Modal for Add or Edit Announcement */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full sm:w-96 rounded-lg shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              {editMode ? (
                <EditAnnouncementForm
                  selectedAnnouncement={selectedAnnouncement}
                  onClose={() => setShowModal(false)}
                  setAnnouncements={setAnnouncements}
                  announcements={announcements}
                />
              ) : (
                <AddAnnouncementForm
                  onClose={() => setShowModal(false)}
                  setAnnouncements={setAnnouncements}
                  announcements={announcements}
                  loggedInAdminId={loggedInAdminId} // Pass logged-in admin ID
                />
              )}
            </div>
          </div>
        )}

        {/* Announcement List Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr key={announcement._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{announcement._id}</td> {/* Display MongoDB ID */}
                  <td className="px-6 py-4">{announcement.title}</td>
                  <td className="px-6 py-4">{getUsernameById(announcement.createdBy)}</td> {/* Display Author Name */}
                  <td className="px-6 py-4">{new Date(announcement.createdAt).toLocaleString()}</td> {/* Created At */}
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    <button
                      className="text-blue-600 hover:underline flex items-center"
                      onClick={() => handleEdit(announcement)}
                    >
                      ✎ Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(announcement._id)} // Use _id here
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

AnnouncementList.propTypes = {
  announcements: PropTypes.array.isRequired,
  setAnnouncements: PropTypes.func.isRequired,
};
