import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

export default function SegmentChart() {
  const [userSegmentsData, setUserSegmentsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "300px" }}>
      <h3 className="text-lg font-semibold mb-4">User Segments</h3>
      <div style={{ height: "220px" }}>
        {userSegmentsData && <Pie data={userSegmentsData} options={options} />}
      </div>
    </div>
  );
}
