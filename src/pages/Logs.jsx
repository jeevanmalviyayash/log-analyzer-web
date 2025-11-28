import React, { useEffect, useState, useMemo } from "react";
import { Typography, Switch } from "antd";
import { fetchAllErrors } from "../api/errorApi";
import AntdLogTable from "../component/AntdLogTable";

const { Title } = Typography;

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lastDaysOnly, setLastDaysOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    const load = async () => {
      if (!token) {
        console.warn("No token found, skipping API call");
        setLoading(false);
        return;
      }
      
      
      setLoading(true);
      try {
        const data = await fetchAllErrors(lastDaysOnly ? 7 : undefined, token);
        setLogs(Array.isArray(data) ? data : []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [lastDaysOnly, token]); 

  const visibleLogs = useMemo(
    () =>
      selectedCategory
        ? logs.filter(l => l.errorType === selectedCategory)
        : logs,
    [logs, selectedCategory]
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2}>Error Logs</Title>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span>Filter by category using dropdown below.</span>
        <span>
          Last 7 days only:{" "}
          <Switch
            checked={lastDaysOnly}
            onChange={setLastDaysOnly}
            size="small"
          />
        </span>
      </div>

      <AntdLogTable
        logs={visibleLogs}
        loading={loading}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
};

export default Logs;
