import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SegmentChart from "./SegmentChart";
import SegmentForm from "./SegmentForm";
import UserTable from "./UserTable";

export default function UserSegment() {
  const [segments, setSegments] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loggedInAdmin, setLoggedInAdmin] = useState(""); // Initially empty

  useEffect(() => {
    // Simulating fetching admin ID from session/local storage
    const adminFromSession = localStorage.getItem("user"); // Assuming "user" contains admin info
    if (adminFromSession) {
      const parsedAdmin = JSON.parse(adminFromSession);
      setLoggedInAdmin(parsedAdmin.id || "admin123"); // Replace fallback with proper logic
    }

    // Fetch the segments from the backend
    const fetchSegments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/segments");
        const data = await response.json();
        setSegments(data);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    };

    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchSegments();
    fetchUsers();
  }, []);

  const addSegment = async (newSegment) => {
    const response = await fetch("http://localhost:5000/api/segments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSegment),
    });

    const savedSegment = await response.json();
    setSegments([...segments, savedSegment]);
  };

  const updateUserSegment = async (userId, newSegmentId) => {
    const response = await fetch(`http://localhost:5000/api/segments/${newSegmentId}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const updatedSegment = await response.json();
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, segment: updatedSegment.name } : user
      )
    );
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
          loggedInAdmin={loggedInAdmin} // Pass the logged-in admin ID
        />
      )}

      {/* User Table */}
      <UserTable
        users={users}
        segments={segments}
        updateUserSegment={updateUserSegment}
      />
    </div>
  );
}
