import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import "../css/Navbar.css";
const { Header } = Layout;

export default function Navbar({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  return (
   <Header style={{ display: "flex", alignItems: "center" }}>
      <div style={{ color: "white", fontWeight: 700, marginRight: 24 }}>
        LogAnalyzer
      </div>
 
      <Menu theme="dark" mode="horizontal" selectable={false} style={{ flex: 1 }}>
        <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
        <Menu.Item key="logs"><Link to="/logs">logs</Link></Menu.Item>
        <Menu.Item key="upload"><Link to="/upload">Upload</Link></Menu.Item>
        {/* <Menu.Item key="logAnalyzer"><Link to="/log-analyzer">Log Analyzer</Link></Menu.Item> */}
        <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
      </Menu>
 
    </Header>
  );
}