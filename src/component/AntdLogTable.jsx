import React, { useState } from "react";
import { Table, Tag, Input, DatePicker, Button } from "antd";
 
const { Search } = Input;
 
const AntdLogTable = ({ logs = [], loading }) => {
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
 
  // NORMALIZE FIELDS
  const processed = logs.map((log, index) => ({
    rowKey: `${index}-${log.timeStamp ?? ""}`,
    timeStamp: log.timeStamp ?? null,
    createdAt: log.createdAt ?? null,
    errorType: log.errorType ?? "",
    errorMessage: log.errorMessage ?? "",
    source: log.source ?? "",
  }));
 
  // FILTERING
let filtered = [...processed];
 
// DATE FILTER
if (dateRange[0] && dateRange[1]) {
  const start = dateRange[0].startOf("day").toDate();
  const end = dateRange[1].endOf("day").toDate();
 
  filtered = filtered.filter((log) => {
    const ts = log.timeStamp ? new Date(log.timeStamp) : null;
    return ts && ts >= start && ts <= end;
  });
}
 
// SEARCH FILTER
if (searchText.trim()) {
  const q = searchText.toLowerCase();
 
  filtered = filtered.filter((log) =>
    log.errorType.toLowerCase().includes(q) ||
    log.errorMessage.toLowerCase().includes(q) ||
    log.source.toLowerCase().includes(q)
  );
}
 
 
  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timeStamp",
      sorter: (a, b) =>
        (Date.parse(a.timeStamp) || 0) - (Date.parse(b.timeStamp) || 0),
      render: (v) => (v ? new Date(v).toLocaleString() : "-"),
    },
    {
      title: "Error Type",
      dataIndex: "errorType",
      sorter: (a, b) =>
        String(a.errorType).localeCompare(String(b.errorType)),
      render: (t) => <Tag color="blue">{t}</Tag>,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      sorter: (a, b) =>
        (Date.parse(a.createdAt) || 0) -
        (Date.parse(b.createdAt) || 0),
      render: (v) => (v ? new Date(v).toLocaleString() : "-"),
    },
    {
      title: "Message",
      dataIndex: "errorMessage",
      ellipsis: true,
    },
    {
      title: "Source System",
      dataIndex: "source",
    },
  ];
 
  const hasFilters = searchText || (dateRange[0] && dateRange[1]);
 
  return (
    <>
      {/* SEARCH & DATE FILTER */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          marginTop: "0.5rem",
        }}
      >
        <Search
          placeholder="Search in Category, Message, or Source System..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={(v) => setSearchText(v)}
          allowClear
          enterButton
          loading={loading}
          size="large"
          style={{ flex: 1 }}
        />
 
        <DatePicker
          value={dateRange[0]}
          onChange={(d) => setDateRange([d, dateRange[1]])}
          size="large"
          placeholder="Start Date"
          style={{ width: 200 }}
          format="YYYY-MM-DD"
        />
 
        <DatePicker
          value={dateRange[1]}
          onChange={(d) => setDateRange([dateRange[0], d])}
          size="large"
          placeholder="End Date"
          style={{ width: 200 }}
          format="YYYY-MM-DD"
        />
 
        {hasFilters && (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setSearchText("");
              setDateRange([null, null]);
            }}
          >
            Clear
          </Button>
        )}
      </div>
 
      {/* TABLE */}
      <Table
        rowKey="rowKey"
        columns={columns}
        dataSource={filtered}
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: true,
        }}
        bordered
      />
    </>
  );
};
 
export default AntdLogTable;
 