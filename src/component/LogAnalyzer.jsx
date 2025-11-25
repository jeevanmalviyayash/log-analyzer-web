import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import LogTable from "./LogTable";
import { fetchLogs } from "../api/logApi";
 
function LogAnalyzer() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);
 
  useEffect(() => {
    const loadLogs = async () => {
      const data = await fetchLogs(search, level, startDate, endDate);
      setLogs(Array.isArray(data) ? data : []);
    };
    loadLogs();
  }, [search, level, startDate, endDate]);
 
  return (
    <div className="w-[92%] mx-auto p-6 font-sans bg-white rounded-xl shadow-sm min-h-[85vh] flex flex-col">
      <h2 className="text-3xl font-bold mb-6 tracking-wide text-slate-800">
        📊 Log Analyzer — Search & Filter
      </h2>
 
      <SearchBar search={search} setSearch={setSearch} />
      <Filters
        level={level}
        setLevel={setLevel}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
 
      {/* table section stays tall even if no data */}
      <div className="flex-grow">
        <LogTable logs={logs} />
      </div>
 
      {/* search summary box stays in last position */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner text-sm leading-6">
        <p><strong>Search:</strong> {search || "None"}</p>
        <p><strong>Level Filter:</strong> {level || "All Levels"}</p>
        <p><strong>Start Date:</strong> {startDate || "Not selected"}</p>
        <p><strong>End Date:</strong> {endDate || "Not selected"}</p>
      </div>
    </div>
  );
}
 
export default LogAnalyzer;
 