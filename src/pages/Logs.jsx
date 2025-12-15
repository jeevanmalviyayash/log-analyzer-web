
import React, { useEffect, useState, useMemo } from "react";
import { Typography, Switch, Button } from "antd";

import { fetchAllErrors } from "../api/errorApi";
import AntdLogTable from "../component/AntdLogTable";
 
const { Title } = Typography;
 
const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [lastDaysOnly, setLastDaysOnly] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    const load = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchAllErrors(lastDaysOnly ? 7 : undefined, token);
        setLogs(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lastDaysOnly, token]);
 
  const visibleLogs = logs;
 
  return (

    <div style={{ maxWidth: "1300px", margin: "0 auto", paddingTop: "1rem" }}>
 
     
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Error Logs
        </Title>
 
        <span style={{ fontSize: 14 }}>

          Last 7 days only:{" "}
          <Switch
            checked={lastDaysOnly}
            onChange={setLastDaysOnly}
            size="small"
          />
        </span>
      </div>
 
      {/* SEARCH & FILTERS & TABLE  */}
      <AntdLogTable logs={visibleLogs} loading={loading} />
    </div>
  );
};
 
export default Logs;
 