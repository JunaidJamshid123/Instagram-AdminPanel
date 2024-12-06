import React from "react";
import { Pie } from "react-chartjs-2";

export default function SegmentChart({ segments }) {
  const data = {
    labels: segments.map((segment) => segment.name),
    datasets: [
      {
        label: "User Segments",
        data: segments.map((segment) => segment.users),
        backgroundColor: ["#4CAF50", "#FF5722", "#2196F3"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "300px" }}>
      <h3 className="text-lg font-semibold mb-4">User Segments</h3>
      <div style={{ height: "220px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
