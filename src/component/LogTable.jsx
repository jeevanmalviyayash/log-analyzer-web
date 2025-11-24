import React from "react";

const LogTable = ({ logs }) => {
  return (
    <table className="w-full border border-gray-300 rounded-md overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Level</th>
          <th className="p-2 border">User</th>
          <th className="p-2 border">Timestamp</th>
          <th className="p-2 border">Created</th>
        </tr>
      </thead>

      <tbody>
        {Array.isArray(logs) && logs.length > 0 ? (
          logs.map((log, index) => (
            <tr
              key={log.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="p-2 border">{log.id}</td>
              <td className="p-2 border">{log.title}</td>
              <td className="p-2 border">{log.description}</td>
              <td className="p-2 border">{log.level}</td>
              <td className="p-2 border">{log.username}</td>
              <td className="p-2 border">
                {log.timestamp?.replace("T", " ").slice(0, 19)}
              </td>
              <td className="p-2 border">
                {log.createdDate?.replace("T", " ").slice(0, 19)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="p-4 text-center text-gray-500">
              No logs available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default LogTable;