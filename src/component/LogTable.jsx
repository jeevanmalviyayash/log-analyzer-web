import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/LogTable.css";

const LogTable = ({ logs }) => {
  const navigate = useNavigate();
  const clickAiFix = () => {
    navigate("/ai-assistant");
  };
  

   const createTicket = (log) => {
    
    navigate("/create-ticket", { state: log }); 
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 mt-4">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-slate-800 text-white text-sm font-semibold">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Error Type</th>
            <th className="px-6 py-3 text-left">Message</th>
            <th className="px-6 py-3 text-left">Source</th>
            <th className="px-6 py-3 text-left">Timestamp</th>
            <th className="px-6 py-3 text-left">CreatedAt</th>
            <th className="px-6 py-3 text-center">Actions</th>
             <th className="px-6 py-3 text-center">Actions</th>
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
                <td className="px-6 py-4">{log.errorId}</td>
                <td className="px-6 py-4">{log.errorType || "-"}</td>
                <td className="px-6 py-4 break-words max-w-xs">
                  {log.errorMessage}
                </td>
                <td className="px-6 py-4 break-words max-w-xs">
                  {log.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.timeStamp?.replace("T", " ").slice(0, 19)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.createdAt?.replace("T", " ").slice(0, 19)}
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button className="ai-btn" onClick={clickAiFix}>
                      AI Assistantgg
                    </button>
  
                  </div>
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {console.log("printing 66666",log)}
                  {log.ticketId != null ? (
                    
  <button
    className="ai-btn"
    onClick={() => navigate("/update-ticket", { state: { ticket: log } })}
  >
    View / Edit
  </button>
) : (
  <button
    className="ai-btn"
    onClick={() => createTicket(log)}
  >
    Create Ticket
  </button>
)}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-6 text-center text-gray-500 font-medium"
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
