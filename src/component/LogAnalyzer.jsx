import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import LogTable from "./LogTable";
import { fetchLogs } from "../api/logApi";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
 

function LogAnalyzer() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();
  const ticketStat = () => {
    navigate("/tickets-stats");
  };

  useEffect(() => {
    setPage(0);
    const loadLogs = async () => {
      const data = await fetchLogs(search, startDate, endDate);
      setLogs(Array.isArray(data) ? data : []);
    };
    loadLogs();
  }, [search, startDate, endDate]);

  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const paginatedLogs = logs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="w-[92%] mx-auto p-6 font-sans bg-white rounded-xl shadow-sm min-h-[85vh] flex flex-col">

      {/* Title row with button on the right */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-wide text-slate-800">
          📊 Log Analyzer — Search & Filter
        </h2>
       <button
    onClick={ticketStat}
    className="ai-btn"
  >
    Ticket Stats
  </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <Filters
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <div className="flex-grow">
        <LogTable logs={paginatedLogs} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className={`px-5 py-2 rounded-xl font-medium shadow-sm border transition 
            ${
              page === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-100 hover:border-blue-500"
            }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-semibold">
          Page {page + 1} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          className={`px-5 py-2 rounded-xl font-medium shadow-sm border transition 
            ${
              page === totalPages - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-100 hover:border-blue-500"
            }`}
        >
          Next
        </button>
      </div>

      {/* Search summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner text-sm leading-6">
        <p><strong>Search:</strong> {search || "None"}</p>
        <p><strong>Start Date:</strong> {startDate || "Not selected"}</p>
        <p><strong>End Date:</strong> {endDate || "Not selected"}</p>
      </div>
    </div>
  );
}

export default LogAnalyzer;
