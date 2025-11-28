import React, { useMemo } from "react";
import { Table, Tag, Select } from "antd";

const { Option } = Select;

const levelColor = (errorType) => {
  if (!errorType || typeof errorType !== 'string') return "gray"; // Defensive check
  if (errorType.includes("DATABASE") || errorType.includes("SECURITY")) return "red";
  if (errorType.includes("VALIDATION") || errorType.includes("CONFIGURATION")) return "orange";
  return "blue";
};

const AntdLogTable = ({ logs, loading, selectedCategory, onCategoryChange }) => {
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(logs.map(l => l.errorType).filter(Boolean)));
  }, [logs]);

  const columns = useMemo(
    () => [
      {
        title: "Timestamp",
        dataIndex: "timeStamp",
        key: "timeStamp",
        sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
        defaultSortOrder: "descend"
      },
      {
        title: "Category",
        dataIndex: "errorType",
        key: "errorType",
        filters: uniqueCategories.map(cat => ({ text: cat, value: cat })),
        onFilter: (value, record) => record.errorType === value,
        render: (errorType) => (
          <Tag color={levelColor(errorType)}>{errorType}</Tag>
        )
      },
      {
        title: "Message",
        dataIndex: "errorMessage",
        key: "errorMessage",
        ellipsis: true
      },
      {
        title: "Source System",
        dataIndex: "source",
        key: "source"
      }
    ],
    [uniqueCategories]
  );

  return (
    <>
      <div style={{ marginBottom: "0.75rem" }}>
        <Select
          value={selectedCategory || undefined} // Avoid null
          onChange={onCategoryChange}
          allowClear
          placeholder="Filter by category"
          style={{ width: 260 }}
        >
          {uniqueCategories.map(cat => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </div>

      <Table
        rowKey={record => record.id || record.timestamp} // Ensure unique key prop
        columns={columns}
        dataSource={logs}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
      />
    </>
  );
};

export default AntdLogTable;
