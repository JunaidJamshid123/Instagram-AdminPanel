import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import RecentActivity from "./Dasboard/RecentActiviies";
import Charts from "./Dasboard/Charts";
import UserStats from "../components/Dasboard/userstats";
import AddUserForm from "../components/UserManagment/add_user_form"; // Import AddUserForm
import UserList from "../components/UserManagment/userlist"; // Correctly capitalize "UserList"
import PostList from "./PostManagment/PostList";
import UserSegment from "../components/UserSegmentations/UserSegment";
import Announcements from "./Announcements/AnnouncementList";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePage, setActivePage] = useState("dashboard"); // State for the active page
   const [adminName, setAdminName] = useState(""); // State for admin name

 useEffect(() => {
    // Fetch admin name from localStorage
    const adminFromSession = localStorage.getItem("user"); // Assuming "user" contains admin info
    if (adminFromSession) {
      const parsedAdmin = JSON.parse(adminFromSession);
      setAdminName(parsedAdmin.username || "Admin"); // Fallback to "Admin" if username is missing
    }

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const renderPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            {/* User Stats */}
            <UserStats />

            {/* Charts and Recent Activity */}
            <Charts />
            <RecentActivity />
          </>
        );
      case "userList":
        return (
          <div>
            <UserList /> {/* Display User List */}
          </div>
        );
      case "post":
        return <div>
        <PostList/>
        </div>;
      case "analytics":
        return <div>
        <UserStats />

            <Charts />
        </div>;
      case "announcements":
        return <div>
        <Announcements/>
        </div>;
      case "userSegments":
        return <div>
        <UserSegment />
        </div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

    return (
    <Layout setActivePage={setActivePage}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {adminName}!</h1>
          <p className="text-gray-600">Here's an overview of your dashboard.</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-lg">{currentTime.toLocaleDateString()}</p>
          <p className="text-gray-500 text-lg">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Dynamic Page Content */}
      {renderPageContent()}
    </Layout>
  );
}
