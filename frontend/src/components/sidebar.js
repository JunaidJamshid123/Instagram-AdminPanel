import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ setActivePage }) {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="h-screen w-60 bg-white text-black flex flex-col justify-between fixed border-r border-gray-300">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6">
        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-purple-600">
          AB
        </div>
        <h2 className="mt-2 text-lg font-semibold text-gray-700">Andrew Bennet</h2>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex-1">
        <ul className="space-y-3 px-6">
          {[
            { label: "Dashboard", value: "dashboard", icon: "dashboard" },
            { label: "User", value: "userList", icon: "person" },
            { label: "Post", value: "post", icon: "description" },
            { label: "Analytics", value: "analytics", icon: "analytics" },
            { label: "Announcements", value: "announcements", icon: "campaign" },
            { label: "User Segments", value: "userSegments", icon: "group" },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-md cursor-pointer transition-colors duration-200 text-gray-700"
              onClick={() => setActivePage(item.value)} // Update active page on click
            >
              <span className="material-icons-outlined text-gray-600">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with Logout */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer"
          onClick={handleLogout}
        >
          <span className="material-icons-outlined text-gray-600">logout</span>
          <span className="font-medium">Logout</span>
        </button>
        <div className="text-center text-sm text-gray-500 mt-4">
          © 2024 Dashboard
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
