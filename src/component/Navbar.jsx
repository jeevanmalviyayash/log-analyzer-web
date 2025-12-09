import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  UploadOutlined,
  ReadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../css/Navbar.css";

const { Header } = Layout;

export default function Navbar({ setToken }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setToken?.(null);
      navigate("/login");
      setIsLoading(false);
    }, 450);
  };

  return (
    <Header className="navbar-header">
      {/* Brand */}
      <div className="navbar-title">LogAnalyzer</div>

      {/* Navigation */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        className="navbar-menu"
        items={[
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/">Dashboard</Link>,
          },
          {
            key: "logs",
            icon: <ReadOutlined />,
            label: <Link to="/logs">Logs</Link>,
          },
          {
            key: "upload",
            icon: <UploadOutlined />,
            label: <Link to="/upload">Upload</Link>,
          },
        ]}
      />

      {/* Right-side actions (kept inline within header) */}
      <div className="navbar-actions">
        <Button
          type="default"
          className={`logout-button ${isLoading ? "is-loading" : ""}`}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out…" : "Logout"}
        </Button>
      </div>
    </Header>
  );
}
