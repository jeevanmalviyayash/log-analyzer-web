import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./component/Upload";
import AIFixes from "./component/AiFixes";
function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
         <Route path="/ai-assistant" element={<AIFixes />} />
      </Routes>
      </Router>

  );
}

export default App;
