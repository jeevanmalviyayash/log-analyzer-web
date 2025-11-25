import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./component/Upload";
import Login from "./component/Login";
import Register from "./component/Registration";
import Home from "./component/Home";
import LogAnalyzer from "./component/LogAnalyzer"; // ✅ Your moved code goes here
import ForgotPassword from "./component/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/upload" element={<Upload />} />

        <Route path="/log-analyzer" element={<LogAnalyzer />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;