import React, { useState, useEffect } from "react";

export default function SegmentForm({ addSegment, closeModal, loggedInAdmin }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return;

    const newSegment = {
      name,
      description,
      createdBy: loggedInAdmin, // Use the logged-in admin's ID
    };

    try {
      // Sending the segment to the backend
      const response = await fetch("http://localhost:5000/api/user-segments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSegment),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new segment");
      }

      const savedSegment = await response.json();
      addSegment(savedSegment);
      closeModal();
    } catch (error) {
      console.error("Error adding segment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Create New Segment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Segment Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter segment name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter segment description"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Segment
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
