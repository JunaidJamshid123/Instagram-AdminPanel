import { useState } from "react";
import AddAnnouncementForm from "./AddAnnouncement";

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([
    {
      id: "A001",
      title: "New Office Opening",
      content: "We are excited to announce the opening of our new office in New York!",
      author: "Admin",
      status: "Active",
    },
    {
      id: "A002",
      title: "Maintenance Notice",
      content: "System maintenance is scheduled for this Sunday from 2:00 AM to 5:00 AM.",
      author: "IT Team",
      status: "Scheduled",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

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

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Announcement Management</h1>
          <div className="flex items-center justify-between mb-6">
            <input
              placeholder="Search announcements..."
              className="pl-4 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 w-full max-w-md"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleAddNewAnnouncement}
            >
              Add New Announcement
            </button>
          </div>
        </div>

        {/* Modal for Add or Edit Announcement */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <AddAnnouncementForm
                editMode={editMode}
                selectedAnnouncement={selectedAnnouncement}
                onClose={() => setShowModal(false)}
                setAnnouncements={setAnnouncements}
                announcements={announcements}
              />
            </div>
          </div>
        )}

        {/* Announcement List Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{announcement.id}</td>
                  <td className="px-6 py-4">{announcement.title}</td>
                  <td className="px-6 py-4">{announcement.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        announcement.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {announcement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    <button
                      className="text-blue-600 hover:underline flex items-center"
                      onClick={() => handleEdit(announcement)}
                    >
                      ✎ Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(announcement.id)}
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
