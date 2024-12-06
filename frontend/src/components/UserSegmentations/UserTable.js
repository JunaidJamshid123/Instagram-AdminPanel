import React from "react";

export default function UserTable({ users, segments, updateUserSegment, removeUserFromSegment }) {
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
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border-b py-2">{user.id}</td>
              <td className="border-b py-2">{user.username}</td>
              <td className="border-b py-2">{user.email}</td>
              <td className="border-b py-2">
                <select
                  value={user.segment}
                  onChange={(e) => updateUserSegment(user.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  {segments.map((segment) => (
                    <option key={segment.id} value={segment.name}>
                      {segment.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border-b py-2">
                <button
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  onClick={() => removeUserFromSegment(user.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
