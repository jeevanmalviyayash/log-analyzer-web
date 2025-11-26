import React, { useMemo } from "react";
import { Table, Tag, Select } from "antd";

const { Option } = Select;

const levelColor = (category) => {
  // simple mapping: database / security red, validation orange, others blue/green
  if (category.includes("DATABASE") || category.includes("SECURITY")) return "red";
  if (category.includes("VALIDATION") || category.includes("CONFIGURATION")) return "orange";
  return "blue";
};

const AntdLogTable = ({ logs, loading, selectedCategory, onCategoryChange }) => {
  const columns = useMemo(
    () => [
      {
        title: "Timestamp",
        dataIndex: "timestamp",
        key: "timestamp",
        sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
        defaultSortOrder: "descend"
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        filters: Array.from(
          new Set(logs.map(l => l.category))
        ).map(cat => ({ text: cat, value: cat })),
        onFilter: (value, record) => record.category === value,
        render: (category) => (
          <Tag color={levelColor(category)}>{category}</Tag>
        )
      },
      {
        title: "Message",
        dataIndex: "message",
        key: "message",
        ellipsis: true
      },
      {
        title: "Source System",
        dataIndex: "sourceSystem",
        key: "sourceSystem"
      }
    ],
    [logs]
  );

  const uniqueCategories = useMemo(
    () => Array.from(new Set(logs.map(l => l.category))),
    [logs]
  );

  return (
    <>
      <div style={{ marginBottom: "0.75rem" }}>
        <Select
          value={selectedCategory}
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
        rowKey="id"
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
