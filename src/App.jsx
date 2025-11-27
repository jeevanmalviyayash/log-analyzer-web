import "./App.css";
import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";

import Upload from "./component/Upload";
import Home from "./component/Home";
import LogAnalyzer from "./component/LogAnalyzer";
import Login from "./component/Login";
import Register from "./component/Registration";
import ForgotPassword from "./component/ForgotPassword";
import AIFixes from "./component/AiFixes";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs"
import Navbar from "./component/Navbar";
import { Layout } from "antd";

const { Content } = Layout;
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        {token && <Navbar setToken={setToken} />}
        <Content style={{ padding: 24 }}>
          <Routes>

            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />

            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/upload"
              element={token ? <Upload /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/logs"
              element={token ? <Logs /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/ai-assistant"
              element={token ? <AIFixes /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/log-analyzer"
              element={token ? <LogAnalyzer /> : <Navigate to="/login" replace />}
            />
            {/* Default route */}
            <Route
              path="/"
              element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
            />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;