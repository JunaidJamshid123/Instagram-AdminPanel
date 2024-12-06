import React from "react";

function Sidebar({ setActivePage }) {
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

      {/* Footer */}
      <div className="text-center py-4 text-sm border-t border-gray-200 text-gray-500">
        © 2024 Dashboard
      </div>
    </div>
  );
}

export default Sidebar;
