import { useState, useEffect } from "react";

export default function EditUserForm({ selectedUser, onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        username: selectedUser.name,
        email: selectedUser.email,
        profilePicture: selectedUser.avatar,
      });
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle API request to update the user
    try {
      const response = await fetch(`http://localhost:5000/api/users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose(); // Close modal on success
        // You can add additional logic to update the user list here
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture URL
          </label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
