import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { ClipLoader } from "react-spinners";
import "chart.js/auto";

export default function InteractiveCharts() {
  const [loading, setLoading] = useState(true);
  const [userGrowthData, setUserGrowthData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Growth",
        data: [],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  });

  const [postsEngagementData, setPostsEngagementData] = useState({
    labels: ["Posts", "Likes", "Comments"],
    datasets: [
      {
        label: "Engagement",
        data: [0, 0, 0], // Default values
        backgroundColor: ["#FF5722", "#03A9F4", "#FFC107"],
        borderColor: "#E0E0E0",
        borderWidth: 1,
      },
    ],
  });

  const [announcementsOverTimeData, setAnnouncementsOverTimeData] = useState({
    labels: [], // Will hold the dates
    datasets: [
      {
        label: "Announcements Sent",
        data: [], // Will hold the number of announcements per day
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  });

  const [userSegmentsData, setUserSegmentsData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Segments",
        data: [],
        backgroundColor: [],
        hoverOffset: 6,
      },
    ],
  });



  useEffect(() => {
    setLoading(true);

   // Fetch user data
// Fetch user data
fetch("http://localhost:5000/api/analytics/users")
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      setLoading(false);
      return;
    }

    // Convert the first and last user's created date to "YYYY-MM-DD"
    const firstUserDate = new Date(data[0].createdAt).toISOString().split("T")[0];
    const lastUserDate = new Date(data[data.length - 1].createdAt).toISOString().split("T")[0];

    // Create an array of all dates from the first to the last user created date, with a gap of 1 day
    const allDates = [];
    let currentDate = new Date(firstUserDate);
    while (currentDate <= new Date(lastUserDate)) {
      // Convert currentDate to "YYYY-MM-DD" format
      const formattedDate = currentDate.toISOString().split("T")[0];
      allDates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }

    // Count the total number of users for each date
    const userCounts = {};
    data.forEach((user) => {
      const formattedDate = new Date(user.createdAt).toISOString().split("T")[0];
      userCounts[formattedDate] = (userCounts[formattedDate] || 0) + 1;
    });

    // Generate user growth data based on allDates and fill missing dates with 0
    const growthData = allDates.map((date, index) => {
      const totalUsers = data.filter((user) => {
        const userDate = new Date(user.createdAt).toISOString().split("T")[0];
        return userDate <= date;
      }).length;
      return totalUsers;
    });

    // Ensure the Y-axis starts from 1 instead of 0
    growthData[0] = 1;  // Set the first data point to 1 (first user)

    // Prepare data for the chart
    setUserGrowthData({
      labels: allDates, // Dates on the X-axis
      datasets: [
        {
          label: "Total Users",
          data: growthData,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.3,
          pointRadius: 3,
        },
      ],
    });
  })
  .catch((error) => console.error("Error fetching user data:", error))
  .finally(() => setLoading(false));



    // Fetch post data
    fetch("http://localhost:5000/api/analytics/posts")
      .then((response) => response.json())
      .then((data) => {
        const postCount = data.length;
        const likeCount = data.reduce((acc, post) => acc + post.likes.length, 0);
        const commentCount = data.reduce(
          (acc, post) => acc + post.comments.length,
          0
        );

        setPostsEngagementData({
          labels: ["Posts", "Likes", "Comments"],
          datasets: [
            {
              label: "Engagement",
              data: [postCount, likeCount, commentCount],
              backgroundColor: ["#FF5722", "#03A9F4", "#FFC107"],
              borderColor: "#E0E0E0",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching post data:", error));

  // Fetch user segment data
    fetch("http://localhost:5000/api/analytics/user-segments")
      .then((response) => response.json())
      .then((data) => {
        const segmentLabels = data.map((segment) => segment.name);
        const segmentData = data.map((segment) => segment.users.length);
        const segmentColors = [
          "#673AB7",
          "#E91E63",
          "#00BCD4",
          "#FFC107",
          "#4CAF50",
        ]; // Add more colors as needed for future segments

        setUserSegmentsData({
          labels: segmentLabels,
          datasets: [
            {
              label: "User Segments",
              data: segmentData,
              backgroundColor: segmentColors.slice(0, segmentLabels.length),
              hoverOffset: 6,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching user segments:", error))
      .finally(() => setLoading(false));

fetch("http://localhost:5000/api/analytics/announcements")
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      setLoading(false);
      return;
    }

    // Convert the start and end dates to "YYYY-MM-DD" format
    const startDate = new Date(data[0].createdAt).toISOString().split("T")[0];
    const endDate = new Date(data[data.length - 1].createdAt).toISOString().split("T")[0];

    // Create an array of all dates from start to end, with a gap of 1 day
    const allDates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      // Convert currentDate to "YYYY-MM-DD" format
      const formattedDate = currentDate.toISOString().split("T")[0];
      allDates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }

    // Count the number of announcements per date
    const announcementCounts = {};
    data.forEach((announcement) => {
      // Convert the announcement date to "YYYY-MM-DD" format
      const formattedDate = new Date(announcement.createdAt).toISOString().split("T")[0];
      announcementCounts[formattedDate] = (announcementCounts[formattedDate] || 0) + 1;
    });

    // Map over allDates to get counts, filling missing dates with 0
    const counts = allDates.map((date) => announcementCounts[date] || 0);

    // Prepare data for the chart
    setAnnouncementsOverTimeData({
      labels: allDates, // Dates on the X-axis
      datasets: [
        {
          label: "Number of Announcements",
          data: counts, // Counts on the Y-axis
          borderColor: "#2196F3",
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          tension: 0.3,
          pointRadius: 4,
        },
      ],
    });
  })
  .catch((error) => console.error("Error fetching announcement data:", error))
  .finally(() => setLoading(false));




  }, []);

 
  

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
