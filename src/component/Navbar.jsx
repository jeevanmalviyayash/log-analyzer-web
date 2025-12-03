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
    <Header className="navbar-header">
      <div className="navbar-title">LogAnalyzer</div>

      <Menu theme="dark" mode="horizontal" selectable={false} style={{ flex: 1 }}>
        <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
        <Menu.Item key="logs"><Link to="/logs">logs</Link></Menu.Item>
        <Menu.Item key="upload"><Link to="/upload">Upload</Link></Menu.Item>
        {/* <Menu.Item key="logAnalyzer"><Link to="/log-analyzer">Log Analyzer</Link></Menu.Item> */}
        <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
      <Menu mode="horizontal" selectable={false} className="navbar-menu">
        <Menu.Item key="dashboard">
          <Link to="/" className="navbar-link">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="logs">
          <Link to="/logs" className="navbar-link">Logs</Link>
        </Menu.Item>
        <Menu.Item key="upload">
          <Link to="/upload" className="navbar-link">Upload</Link>
        </Menu.Item>
        <Menu.Item key="logAnalyzer">
          <Link to="/log-analyzer" className="navbar-link">Log Analyzer</Link>
        </Menu.Item>
        <Menu.Item key="logout" className="navbar-logout">
          <Button type="primary" danger onClick={handleLogout} className="logout-button">
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
