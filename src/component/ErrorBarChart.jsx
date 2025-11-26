import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const ErrorBarChart = ({ data }) => {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3>Total Errors per Day</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8 }}
            formatter={(value) => [value, "Errors"]}
          />
          <Bar dataKey="count" fill="#d32f2f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ErrorBarChart;
