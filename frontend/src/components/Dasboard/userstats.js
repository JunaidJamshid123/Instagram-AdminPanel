import React, { useEffect, useState } from "react";
import { FaUsers, FaClipboardList, FaBullhorn, FaChartLine, FaLayerGroup } from "react-icons/fa";

export default function UserStats() {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalAnnouncements: 0,
    totalUserSegments: 0,
    engagementRate: "0.00",
  });

  // Fetch analytics data from the backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/analytics/analytics");
        const data = await response.json();
        setAnalyticsData({
          totalUsers: data.totalUsers,
          totalPosts: data.totalPosts,
          totalAnnouncements: data.totalAnnouncements,
          totalUserSegments: data.totalUserSegments,
          engagementRate: data.userEngagement.engagementRate,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Stats array to display
  const stats = [
    { number: analyticsData.totalUsers, title: "Total Users", icon: <FaUsers size={24} className="text-purple-600" /> },
    { number: analyticsData.totalPosts, title: "Total Posts", icon: <FaClipboardList size={24} className="text-yellow-600" /> },
    { number: analyticsData.totalAnnouncements, title: "Announcements Sent", icon: <FaBullhorn size={24} className="text-blue-600" /> },
    { number: `${analyticsData.engagementRate}%`, title: "Engagement Rate", icon: <FaChartLine size={24} className="text-green-600" /> },
    { number: analyticsData.totalUserSegments, title: "User Groups", icon: <FaLayerGroup size={24} className="text-pink-600" /> },
  ];

  return (
    <div className="mb-6">
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
    </div>
  );
}
