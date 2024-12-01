import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import RecentActivity from "./Dasboard/RecentActiviies";
import Charts from "./Dasboard/Charts";
import UserStats from "../components/Dasboard/userstats";
import AddUserForm from "../components/UserManagment/add_user_form"; // Import AddUserForm
import UserList from "../components/UserManagment/userlist"; // Correctly capitalize "UserList"
import PostList from "./PostManagment/PostList";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePage, setActivePage] = useState("dashboard"); // State for the active page

  useEffect(() => {
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
        return <div>Analytics Page</div>;
      case "announcements":
        return <div>Announcements Page</div>;
      case "userSegments":
        return <div>User Segments Page</div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <Layout setActivePage={setActivePage}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Admin Junaid!</h1>
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
