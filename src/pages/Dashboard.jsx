import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Switch } from "antd";
import { fetchDailyCounts, fetchCategoryStats } from "../api/errorApi";
import ErrorBarChart from "../component/ErrorBarChart";
import ErrorCategoryPie from "../component/ErrorCategoryPie";

const { Title } = Typography;

const Dashboard = () => {
  const [dailyCounts, setDailyCounts] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [lastDaysBar, setLastDaysBar] = useState(10);
  const [lastDaysPie, setLastDaysPie] = useState(30);

  useEffect(() => {
    const load = async () => {
      const data = await fetchDailyCounts(lastDaysBar);
      // backend returns date as "2025-11-15" (LocalDate); use as is
      setDailyCounts(
        Array.isArray(data)
          ? data.map(d => ({
              date: d.date,     // assuming backend serializes LocalDate as string
              count: d.count
            }))
          : []
      );
    };
    load();
  }, [lastDaysBar]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCategoryStats(lastDaysPie);
      setCategoryStats(Array.isArray(data) ? data : []);
    };
    load();
  }, [lastDaysPie]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2}>Error Analytics Dashboard</Title>

      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Daily Error Count</span>
                <span style={{ fontSize: 12 }}>
                  Last {lastDaysBar} days{" "}
                  <Switch
                    checked={lastDaysBar === 10}
                    onChange={(checked) => setLastDaysBar(checked ? 10 : 30)}
                    size="small"
                  />
                </span>
              </div>
            }
          >
            <ErrorBarChart data={dailyCounts} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Error Category Distribution</span>
                <span style={{ fontSize: 12 }}>
                  Last {lastDaysPie} days{" "}
                  <Switch
                    checked={lastDaysPie === 30}
                    onChange={(checked) => setLastDaysPie(checked ? 30 : 7)}
                    size="small"
                  />
                </span>
              </div>
            }
          >
            <ErrorCategoryPie stats={categoryStats} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
