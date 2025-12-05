import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TicketsStat.css";

export default function TicketStats() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL"); // NEW: filter state
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_HOST_URL;
  const token = localStorage.getItem("token");
  const userEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${apiUrl}/tickets/user-id/${userEmail}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    if (userEmail) {
      fetchTickets();
    }
  }, [apiUrl, token, userEmail]);

  // 🧮 Compute statistics
  const stats = useMemo(() => {
    const counts = { OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0, CLOSED: 0, REOPENED: 0 };
    tickets.forEach(t => {
      if (counts[t.status] !== undefined) {
        counts[t.status]++;
      }
    });
    return counts;
  }, [tickets]);

  // ✨ Filter tickets based on dropdown
  const filteredTickets = useMemo(() => {
    if (statusFilter === "ALL") return tickets;
    return tickets.filter(t => t.status === statusFilter);
  }, [tickets, statusFilter]);

  return (
    <div className="ticket-list-container">
      <h1 className="ticket-title">📋 Ticket Board</h1>

 {/* NEW: Status filter dropdown */}
      <div className="filter-bar">
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
          <option value="CLOSED">CLOSED</option>
          <option value="REOPENED">REOPENED</option>
        </select>
      </div>

      {/* Statistics summary bar */}
      <div className="ticket-stats-bar">
        <div className="stat-box open">Open: {stats.OPEN}</div>
        <div className="stat-box progress">In Progress: {stats.IN_PROGRESS}</div>
        <div className="stat-box resolved">Resolved: {stats.RESOLVED}</div>
        <div className="stat-box closed">Closed: {stats.CLOSED}</div>
        <div className="stat-box reopened">Reopened: {stats.REOPENED}</div>
      </div>

     

      {/* Ticket table */}
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created By</th>
            <th>Last Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => (
              <tr key={ticket.ticketId}>
                <td>{ticket.ticketId}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.createdBy}</td>
               <td>
  {new Date(ticket.updatedDate).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  }).replace(/\//g, "-")}
</td>

                <td>
                  <button
                    className="ai-btn"
                    onClick={() => navigate("/update-ticket", { state: ticket })}
                  >
                    View / Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-tickets">
                No tickets found for {statusFilter}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
