 import React from "react";
 
const LogTable = ({ logs }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200 mt-4">
      <table className="w-full text-sm text-gray-800">
        <thead className="bg-slate-800 text-white text-sm font-semibold">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Error Type</th>
            <th className="px-4 py-3 text-left">Description</th>
            {/* <th className="px-4 py-3 text-left">Level</th> */}
            <th className="px-4 py-3 text-left">Source</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
            <th className="px-4 py-3 text-left">Created</th>
          </tr>
        </thead>
 
        <tbody>
          {Array.isArray(logs) && logs.length > 0 ? (
            logs.map((log, index) => (
              <tr
                key={log.errorId}
                className={`border-b transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="px-4 py-3">{log.errorId}</td>
                <td className="px-4 py-3">{log.errorType || "-"}</td>
                <td className="px-4 py-3">{log.errorMessage}</td>
 
                {/* Level color badge
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold
                    ${
                      log.errorLevel === "ERROR"
                        ? "bg-red-100 text-red-700"
                        : log.errorLevel === "WARN"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {log.errorLevel}
                  </span>
                </td> */}
 
                <td className="px-4 py-3">{log.source}</td>
                <td className="px-4 py-3">
                  {log.timeStamp?.replace("T", " ").slice(0, 19)}
                </td>
                <td className="px-4 py-3">
                  {log.createdAt?.replace("T", " ").slice(0, 19)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-4 py-6 text-center text-gray-500 font-medium"
              >
                No logs available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
 
export default LogTable;
 