import React,{useState,useEffect} from "react";
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
    <div className="w-[90%] mx-auto p-5 font-sans">
      <h2 className="text-2xl font-bold mb-4">Log Analyzer - Search & Filter</h2>
 
      <SearchBar search={search} setSearch={setSearch} />
 
      <Filters
        level={level}
        setLevel={setLevel}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
 
      <LogTable logs={logs} />
 
      <div className="mt-5 p-4 bg-gray-100 rounded-md shadow">
        <p><strong>Search:</strong> {search}</p>
        <p><strong>Level Filter:</strong> {level || "All Levels"}</p>
        <p><strong>Start Date:</strong> {startDate || "Not selected"}</p>
        <p><strong>End Date:</strong> {endDate || "Not selected"}</p>
      </div>
    </div>
  );
}
 
export default LogAnalyzer;
 