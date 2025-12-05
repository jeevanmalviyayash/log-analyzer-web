import React, { useEffect, useState, useMemo } from "react";
import { Typography, Switch, Button } from "antd";
import { fetchAllErrors } from "../api/errorApi";
import AntdLogTable from "../component/AntdLogTable";

const { Title } = Typography;

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lastDaysOnly, setLastDaysOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchAllErrors(lastDaysOnly ? 7 : undefined);
        setLogs(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [lastDaysOnly]);

  const visibleLogs = useMemo(
    () =>
      selectedCategory
        ? logs.filter(l => l.category === selectedCategory)
        : logs,
    [logs, selectedCategory]
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Title + Buttons aligned in one row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={2} style={{ margin: 0 }}>Error Logs</Title>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button type="primary" onClick={() => console.log("Navigate to create ticket")}>
            Create Ticket
          </Button>
          <Button onClick={() => console.log("Navigate to ticket stats")}>
            Ticket Stats
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", marginTop: "1rem" }}>
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
