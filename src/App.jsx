import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./component/Upload";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
