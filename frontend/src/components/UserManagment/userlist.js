import { useState } from "react";
import AddUserForm from "./add_user_form";

export default function UserList() {
  const [users, setUsers] = useState([
    {
      id: "001",
      name: "Wayne Bruce",
      email: "wayne@example.com",
      role: "user",
      status: "Active",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: "002",
      name: "Ragnor Lothbrok",
      email: "ragnor@example.com",
      role: "admin",
      status: "Active",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: "003",
      name: "Arthur Pendragon",
      email: "arthur@example.com",
      role: "moderator",
      status: "Deactive",
      avatar: "https://via.placeholder.com/40",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAddNewUser = () => {
    setEditMode(false);
    setSelectedUser(null);
    setShowModal(true);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">User Management</h1>
          <div className="flex items-center justify-between mb-6">
            <input
              placeholder="Search users..."
              className="pl-4 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 w-full max-w-md"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleAddNewUser}
            >
              Add New User
            </button>
          </div>
        </div>

        {/* Modal for Add or Edit User */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <AddUserForm
                editMode={editMode}
                selectedUser={selectedUser}
                onClose={() => setShowModal(false)}
              />
            </div>
          </div>
        )}

        {/* User List Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    <button
                      className="text-blue-600 hover:underline flex items-center"
                      onClick={() => handleEdit(user)}
                    >
                      ✎ Edit
                    </button>
                    <button className="text-red-600 hover:underline">🗑️ Delete</button>
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
