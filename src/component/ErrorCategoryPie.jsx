import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#d32f2f",
  "#f57c00",
  "#1976d2",
  "#388e3c",
  "#7b1fa2",
  "#00796b",
  "#c62828",
  "#5d4037",
  "#ff8f00",
  "#0288d1",
  "#2e7d32",
  "#6a1b9a",
  "#00838f",
  "#ad1457"
];

const prettifyCategory = (cat) =>
  cat
    .toLowerCase()
    .split("_")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const ErrorCategoryPie = ({ stats }) => {
  const total = useMemo(
    () => stats.reduce((sum, s) => sum + s.count, 0),
    [stats]
  );

  const data = useMemo(
    () =>
      stats.map((s) => ({
        name: prettifyCategory(s.category),
        value: s.count,
        percent: total === 0 ? 0 : ((s.count / total) * 100).toFixed(1)
      })),
    [stats, total]
  );

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3>Error Category Distribution (%)</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `${entry.name} (${entry.percent}%)`}
          >
            {data.map((entry, idx) => (
              <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `${value} errors (${props.payload.percent}%)`,
              name
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ErrorCategoryPie;
