import React from "react";
 
const LogTable = ({ logs }) => {
  return (
    <table className="log-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Level</th>
          <th>User</th>
          <th>Timestamp</th>
          <th>Created</th>
        </tr>
      </thead>
 
      <tbody>
        {logs.map((log) => (
            <tr key={log.id}>
           <td> {log.id}</td>
            <td>{log.title}</td>
            <td>{log.description}</td>
            <td>{log.level}</td>
            <td>{log.username}</td>
            <td>{log.timestamp?.replace("T", " ").slice(0, 19)}</td>
            <td>{log.createdDate?.replace("T", " ").slice(0, 19)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default LogTable;
 