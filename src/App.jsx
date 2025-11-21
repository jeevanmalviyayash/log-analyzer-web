import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./component/Upload";
import Home from "./component/Home";
import LogAnalyzer from "./component/LogAnalyzer"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/upload" element={<Upload />} />

        <Route path="/log-analyzer" element={<LogAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;