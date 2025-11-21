import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import LogTable from "./LogTable";
import { fetchLogs } from "../api/logApi";
import "../style/filterlog.css";
 
function LogAnalyzer() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);
 
  // Connect frontend to backend
  useEffect(() => {
    const loadLogs = async () => {
      const data = await fetchLogs(search, level, startDate, endDate);
      setLogs(Array.isArray(data) ? data : []); //saves returned logs
    };
    loadLogs();
  }, [search, level, startDate, endDate]);
 
  return (
    <div className="container">
      <h2>Log Analyzer - Search & Filter</h2>
 
      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />
 
      {/* Filters */}
      <Filters
        level={level}
        setLevel={setLevel}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
 
      {/* Display Backend Logs */}
      <LogTable logs={logs} />
 
      <div className="result-box">
        <p><strong>Search:</strong> {search}</p>
        <p><strong>Level Filter:</strong> {level || "All Levels"}</p>
        <p><strong>Start Date:</strong> {startDate || "Not selected"}</p>
        <p><strong>End Date:</strong> {endDate || "Not selected"}</p>
      </div>
    </div>
  );
}
 
export default LogAnalyzer;
 