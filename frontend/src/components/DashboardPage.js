import React, { useEffect, useState } from "react";
import Header from "./header";
import Layout from "./Layout";
import RecentActivity from "./Dasboard/RecentActiviies";
import Charts from "./Dasboard/Charts";
import { FaUsers, FaClipboardList, FaBullhorn, FaChartLine, FaLayerGroup } from "react-icons/fa";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: "10,123", title: "Total Users", icon: <FaUsers size={24} className="text-purple-600" /> },
    { number: "5,432", title: "Total Posts", icon: <FaClipboardList size={24} className="text-yellow-600" /> },
    { number: "1,245", title: "Announcements Sent", icon: <FaBullhorn size={24} className="text-blue-600" /> },
    { number: "67%", title: "Engagement Rate", icon: <FaChartLine size={24} className="text-green-600" /> },
    { number: "25", title: "User Groups", icon: <FaLayerGroup size={24} className="text-pink-600" /> },
  ];

  return (
    <Layout>
      <Header />
      <div className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Admin Junaid!</h1>
            <p className="text-gray-600">Here's an overview of your dashboard.</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-lg">{currentTime.toLocaleDateString()}</p>
            <p className="text-gray-500 text-lg">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>

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

        <Charts />
        <RecentActivity />
      </div>
    </Layout>
  );
}
