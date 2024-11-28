import React from "react";

function Sidebar({ setActivePage }) {
  return (
    <div className="h-screen w-60 bg-blue-900 text-white flex flex-col justify-between fixed">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6">
        <div className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-blue-900">
          AB
        </div>
        <h2 className="mt-2 text-lg font-semibold">Andrew Bennet</h2>
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
              className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md cursor-pointer"
              onClick={() => setActivePage(item.value)} // Update active page on click
            >
              <span className="material-icons-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="text-center py-4 text-sm border-t border-gray-700">
        © 2024 Dashboard
      </div>
    </div>
  );
}

export default Sidebar;
