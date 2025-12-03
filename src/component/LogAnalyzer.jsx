import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import LogTable from "./LogTable";
import { fetchLogs } from "../api/logApi";
import Navbar from "./Navbar";
 
function LogAnalyzer() {
  const [search, setSearch] = useState("");
  // const [level, setLevel] = useState("");     
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);
 
  
  // FRONTEND PAGINATION STATE
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
 
  useEffect(() => {
    // Reset page when filters/search change
    setPage(0);
 
    const loadLogs = async () => {
      const data = await fetchLogs(search, startDate, endDate);
      setLogs(Array.isArray(data) ? data : []);
    };
 
    loadLogs();
  }, [search, startDate, endDate]);
 
  
  // SIMPLE PREV / NEXT PAGINATION LOGIC
  const totalPages = Math.ceil(logs.length / rowsPerPage);
 
  const paginatedLogs = logs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
 
  return (
    <div className="w-[92%] mx-auto p-6 font-sans bg-white rounded-xl shadow-sm min-h-[85vh] flex flex-col">
 
      <h2 className="text-3xl font-bold mb-6 tracking-wide text-slate-800">
        📊 Log Analyzer — Search & Filter
      </h2>
 
      <SearchBar search={search} setSearch={setSearch} />
 
      <Filters
        // level={level}           
        // setLevel={setLevel}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
 
      {/* TABLE SECTION */}
      <div className="flex-grow">
        <LogTable logs={paginatedLogs} />
      </div>
 
      {/* ONLY PREVIOUS / NEXT BUTTONS */}
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
 
      {/* SEARCH SUMMARY */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner text-sm leading-6">
        <p><strong>Search:</strong> {search || "None"}</p>
 
        {/* <p><strong>Level Filter:</strong> {level || "All Levels"}</p> */} 
      
        <p><strong>Start Date:</strong> {startDate || "Not selected"}</p>
        <p><strong>End Date:</strong> {endDate || "Not selected"}</p>
      </div>
 
    </div>
  );
}
 
export default LogAnalyzer;
 