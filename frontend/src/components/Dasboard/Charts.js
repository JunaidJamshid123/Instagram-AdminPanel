// Charts.js
import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { ClipLoader } from "react-spinners";
import "chart.js/auto";

export default function InteractiveCharts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [500, 1000, 1500, 2000, 3000, 4000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const postsEngagementData = {
    labels: ["Likes", "Comments", "Shares"],
    datasets: [
      {
        label: "Engagement",
        data: [1500, 700, 300],
        backgroundColor: ["#FF5722", "#03A9F4", "#FFC107"],
        borderColor: "#E0E0E0",
        borderWidth: 1,
      },
    ],
  };

  const announcementsOverTimeData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Announcements Sent",
        data: [50, 70, 60, 90, 110],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const userSegmentsData = {
    labels: ["Segment A", "Segment B", "Segment C"],
    datasets: [
      {
        label: "User Segments",
        data: [40, 35, 25],
        backgroundColor: ["#673AB7", "#E91E63", "#00BCD4"],
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading ? (
        <div className="col-span-2 flex justify-center items-center h-64">
          <ClipLoader size={50} color="#4CAF50" />
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "300px" }}>
            <h3 className="text-lg font-semibold mb-4">User Growth Over Time</h3>
            <div style={{ height: "220px" }}>
              <Line data={userGrowthData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "300px" }}>
            <h3 className="text-lg font-semibold mb-4">Posts vs Engagement</h3>
            <div style={{ height: "220px" }}>
              <Bar data={postsEngagementData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "300px" }}>
            <h3 className="text-lg font-semibold mb-4">Announcements Sent Over Time</h3>
            <div style={{ height: "220px" }}>
              <Line data={announcementsOverTimeData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "300px" }}>
            <h3 className="text-lg font-semibold mb-4">Top User Segments</h3>
            <div style={{ height: "220px" }}>
              <Pie data={userSegmentsData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
