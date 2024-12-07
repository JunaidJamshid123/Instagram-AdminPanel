import React from "react";
import { FaUser, FaEnvelope, FaKey, FaImage, FaCheckCircle, FaTimesCircle, FaUsers, FaCalendarAlt } from "react-icons/fa";

export default function UserDataForm({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition duration-200 text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center gap-2">
          <FaUser className="text-blue-500" /> User Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaKey className="text-blue-500" />
            <strong>ID:</strong> <span>{user._id}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500" />
            <strong>Username:</strong> <span>{user.username}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500" />
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaKey className="text-blue-500" />
            <strong>Password:</strong> <span>{user.password}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaImage className="text-blue-500" />
            <strong>Profile Picture:</strong>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="h-10 w-10 rounded-full border border-gray-300 ml-2"
            />
          </div>
          <div className="flex items-center gap-3">
            {user.isAdmin ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <strong>Is Admin:</strong> <span>{user.isAdmin ? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUsers className="text-blue-500" />
            <strong>Followers:</strong> <span>{user.followers?.length || 0}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUsers className="text-blue-500" />
            <strong>Following:</strong> <span>{user.following?.length || 0}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUsers className="text-blue-500" />
            <strong>Posts:</strong> <span>{user.posts?.length || 0}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-500" />
            <strong>Created At:</strong>{" "}
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-500" />
            <strong>Updated At:</strong>{" "}
            <span>{new Date(user.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
