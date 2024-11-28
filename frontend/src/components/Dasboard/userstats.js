import React from "react";
import { FaUsers, FaClipboardList, FaBullhorn, FaChartLine, FaLayerGroup } from "react-icons/fa";

const stats = [
  { number: "10,123", title: "Total Users", icon: <FaUsers size={24} className="text-purple-600" /> },
  { number: "5,432", title: "Total Posts", icon: <FaClipboardList size={24} className="text-yellow-600" /> },
  { number: "1,245", title: "Announcements Sent", icon: <FaBullhorn size={24} className="text-blue-600" /> },
  { number: "67%", title: "Engagement Rate", icon: <FaChartLine size={24} className="text-green-600" /> },
  { number: "25", title: "User Groups", icon: <FaLayerGroup size={24} className="text-pink-600" /> },
];

export default function UserStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="p-4 bg-white shadow rounded-lg flex items-center">
          <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{stat.number}</h2>
            <p className="text-gray-500">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
