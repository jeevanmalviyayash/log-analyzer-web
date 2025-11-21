import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./component/Upload";
import AIFixes from "./component/AiFixes";
import Home from "./component/Home";
import LogAnalyzer from "./component/LogAnalyzer"; // ✅ Your moved code goes here


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/ai-assistant" element={<AIFixes />} />

        <Route path="/" element={<Home />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/log-analyzer" element={<LogAnalyzer />} />
      </Routes>
    </Router>

  );
}

export default App;