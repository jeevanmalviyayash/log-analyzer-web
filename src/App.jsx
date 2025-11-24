import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Upload from "./component/Upload";
import Home from "./component/Home";
import LogAnalyzer from "./component/LogAnalyzer"; // ✅ Your moved code goes here
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs"
import Navbar from "./component/Navbar";
import { Layout } from "antd";

const { Content } = Layout;
function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Content style={{ padding: 24 }}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}

            <Route path="/upload" element={<Upload />} />

            <Route path="/log-analyzer" element={<LogAnalyzer />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;