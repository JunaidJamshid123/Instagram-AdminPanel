import React, { useState } from "react";
import SegmentChart from "./SegmentChart";
import SegmentForm from "./SegmentForm";
import UserTable from "./UserTable";

export default function UserSegment() {
  const [segments, setSegments] = useState([
    { id: 1, name: "Premium Users", users: 40 },
    { id: 2, name: "Trial Users", users: 25 },
    { id: 3, name: "Inactive Users", users: 35 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: "JohnDoe", email: "john@example.com", segment: "Premium Users" },
    { id: 2, username: "JaneSmith", email: "jane@example.com", segment: "Trial Users" },
    { id: 3, username: "MarkLee", email: "mark@example.com", segment: "Inactive Users" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const addSegment = (newSegment) => {
    setSegments([...segments, newSegment]);
  };

  const updateUserSegment = (userId, newSegment) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, segment: newSegment } : user
      )
    );
  };

  const removeUserFromSegment = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Segments</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          Create New Segment
        </button>
      </div>

      {/* Segment Chart */}
      <SegmentChart segments={segments} />

      {/* Segment Form Modal */}
      {showModal && (
        <SegmentForm
          addSegment={addSegment}
          closeModal={() => setShowModal(false)}
        />
      )}

      {/* User Table */}
      <UserTable
        users={users}
        segments={segments}
        updateUserSegment={updateUserSegment}
        removeUserFromSegment={removeUserFromSegment}
      />
    </div>
  );
}
