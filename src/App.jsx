import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Upload from "./component/Upload";
import Login from "./component/Login";
import Register from "./component/Registration";
import ForgotPassword from "./component/ForgotPassword";
import AIFixes from "./component/AiFixes";
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
            <Route path="/ai-assistant" element={<AIFixes />} />
            <Route path="/log-analyzer" element={<LogAnalyzer />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
               <Route path="/log-analyzer" element={<LogAnalyzer />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;