import React from "react";
import { FaUser, FaClipboard, FaBullhorn, FaFlag, FaPen } from "react-icons/fa";

export default function RecentActivity() {
  // Example list of activities
  const activities = [
    { id: 1, icon: <FaUser className="text-blue-500" />, description: "New user registered", timestamp: "28-11-2024 02:15 PM" },
    { id: 2, icon: <FaClipboard className="text-green-500" />, description: "Post flagged as inappropriate", timestamp: "27-11-2024 10:45 AM" },
    { id: 3, icon: <FaBullhorn className="text-purple-500" />, description: "Announcement sent to all users", timestamp: "26-11-2024 09:00 AM" },
    { id: 4, icon: <FaFlag className="text-red-500" />, description: "Issue #12345 resolved", timestamp: "25-11-2024 03:30 PM" },
    { id: 5, icon: <FaPen className="text-orange-500" />, description: "User edited profile details", timestamp: "24-11-2024 11:00 AM" },
    { id: 6, icon: <FaUser className="text-blue-500" />, description: "User deleted account", timestamp: "23-11-2024 01:00 PM" },
  ];

  // Show only first 5 activities, rest will be hidden
  const visibleActivities = activities.slice(0, 5);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <a href="#" className="text-blue-600 hover:underline">
          View All
        </a>
      </div>
      <ul className="space-y-4">
        {visibleActivities.map((activity) => (
          <li key={activity.id} className="flex items-center space-x-4">
            {/* Icon */}
            <div className="p-3 bg-gray-100 rounded-full">{activity.icon}</div>
            {/* Description */}
            <div>
              <p className="text-gray-800 font-medium">{activity.description}</p>
              <p className="text-gray-500 text-sm">{activity.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
