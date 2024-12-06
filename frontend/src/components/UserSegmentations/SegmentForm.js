import React, { useState } from "react";

export default function SegmentForm({ addSegment, closeModal }) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState(0);
  const [description, setDescription] = useState("");
  const [criteria, setCriteria] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || users <= 0) return;
    const newSegment = {
      id: Date.now(),
      name,
      users: parseInt(users),
      description,
      criteria,
    };
    addSegment(newSegment);
    closeModal();
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
            <label className="block text-sm font-medium">Number of Users</label>
            <input
              type="number"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter number of users"
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
          <div>
            <label className="block text-sm font-medium">Criteria</label>
            <textarea
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter criteria for the segment"
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
