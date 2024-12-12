import React from "react";

export default function UserTable({ users, segments, updateUserSegment }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">User List</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b py-2 text-left">User ID</th>
            <th className="border-b py-2 text-left">Username</th>
            <th className="border-b py-2 text-left">Email</th>
            <th className="border-b py-2 text-left">Segment</th>
            <th className="border-b py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border-b py-2">{user._id}</td>
              <td className="border-b py-2">{user.username}</td>
              <td className="border-b py-2">{user.email}</td>
              <td className="border-b py-2">
                <select
                  value={user.segment}
                  onChange={(e) => updateUserSegment(user._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  {segments.map((segment) => (
                    <option key={segment._id} value={segment._id}>
                      {segment.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border-b py-2">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  onClick={() => updateUserSegment(user._id, user.segment)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
